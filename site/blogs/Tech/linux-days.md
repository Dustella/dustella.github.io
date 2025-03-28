TLDR: 给出这样的问题不太合适，因为对大部分人来说Linux桌面端甚至都不是一个选项。但是如果是对于折腾爱好者的话，我非常有信心地回答，不仅够日用，而且提高了我的使用体验。

先甩上我的配置

![](https://img-cdn.dustella.net/markdown/20250328164200.png)

## 背景和动机

笔者是研究生，超重度电脑使用者。主要做前端开发、炼丹，当然也打一些游戏。有写文档、做PPT展示和写论文的需要。

上大学之前，我就不是 Linux 纯小白。高中的时候和相当多的人一样，搭建MC服务器、买域名、建站。而且我并不喜欢宝塔面板，我比较早就熟悉了用各种cli去控制docker等东西。

大部分情况下，我有三台设备：**一个台式机**（R9 7900X）用来日常开发和练模型、**一个轻薄本**（R7 4750U）天天跑来跑去都带在包里，还有**一个迷你主机**（R9 5900HS ES版）用来跑各种staging的服务，并托管某些开发环境。毫无疑问这个小主机运行的是Linux（Debian）。毕竟它完全不接显示器。

而我主力桌面端设备切换成 Linux 的动机非常神奇：

我的轻薄本（ThinkPad X13 AMD Gen1， R7 4750U）**实在是带不动这个时代的Windows**了。

就拿22H2~23H2时代为例，

**我无法忍受Windows的bug和卡顿。**日常发生的explorer崩溃和任务栏图标丢失不提，我打开一个资源管理器窗口需要等他2~3秒。

**我无法忍受Windows糟糕的内存调度。**即使我把所有开发时的负载都丢到别的机器上，然后用ssh去远程，几个VSCode进程（via ssh）和一堆浏览器窗口、一堆IM等后台可以非常轻松地把16G的内存吃到95%以上。somehow，Windows能保证我这样长时间用着也不OOM，但是真的开一个浏览器标签页都很卡。

**最重要的，最重要的，我无法忍受Windows的续航。**在刚买这个笔记本的时候，它日用续航也就堪堪4h左右。而在若干次系统更新和电池损耗之后，它单是开着机，什么都不做，不留后台，**它也会在1.5h左右自然耗尽电量**。这实在是让人费解，虽然我没有运行任何应用，它的机身却非常烫，不知道它在干什么。

我在初中的时候就在很多老爷机上折腾过Ubuntu，当时他能在低端机上流畅运行就已经给我留下了深刻的印象。于是，我从2024年7月把机器换成Linux，**结果，这半年我真的再也没有重启进过Windows了。**

所以，本文下面的部分会介绍我的场景下的Linux桌面配置。我相信很多东西是跨发行版的，虽然我的文章里不少软件都是AUR仓库里的，用paru一行指令就能装上。很多内容在archwiki中有更详细的解释。

## 基础环境

### 发行版和包管理

Linux本身只提供一个内核，而各大发行版对它提供各种深度的魔改。发行版之间，INIT、包管理、某些依赖都互不相同，许多软件互不兼容（有办法跨发行版运行软件，见后文）

用的人最多的发行版可能是Ubuntu或者Debian，但是我用的发行版是Manjaro。事实上本应该是Arch，只是我懒得手动安装，并自己配置各种驱动。我用Arch based 发行版最大的两个原因：pacman 和 AUR，无他。

Linux 下面软件都由某种包管理器控制，而Arch 的 pacman 是我用的最顺手的包管理器，没有之一。而AUR可能是我无法离开Arch based的最大原因。简单说，它是一个用户可以自由上传东西的仓库，有很多好心人会帮我们打包好复杂的环境，从别的发行版移植特定软件。

Manjaro 不是原生 Arch，它虽然也用pacman，也能用AUR，但是它的包版本比Arch大约滞后了1~2个月。它的解释是“需要测试一些稳定性”。但是我强烈建议所有人把包管理分支切换成’manjaro-unstable’。因为，AUR仓库里的包都假定你是Arch，而Arch包的版本都普遍更新。我遇到过两次因为Manjaro包版本滞后导致AUR的包无法安装的问题，而切换不稳定分支就行了。因为unstable分支的上游就是Arch，大约每两天从上游同步一次，所以也不太需要担心不稳定性问题，反正我没遇到过。

### Gnome, X11 & Wayland

Linux 内核并不像Windows那样原生支持图形界面。图形界面是由内核外的某些软件负责的。目前用的最多的是两种，X11 和 Wayland。他们提供两种不同的协议，Linux 应用只需要实现他们的协议就能产生图形界面。

那么Gnome是什么？它是一个桌面环境，所对应的可能是Windows上的explorer。它提供任务栏、桌面、状态栏这一类东西，它也需要调用X11或者wayland才能显示。有的人会更喜欢KDE或者别的桌面环境，他们界面可能更像Windows，但是Gnome有一点点像苹果。

实际上，在你的机器上，不应该是 X11 or Wayland, 而是 X11 and Wayland。我先说一个暴论：现阶段完全摆脱原生X11是愚蠢的，哪怕你是在wayland下用xwayland兼容层，相当多的应用都有边角的东西会broken。几个有关串流和视频会议的软件问题相当大，后文提到软件会解释。

在你同时正确配置X11和Wayland之后，Gnome 可以在登录界面切换这两种协议。

额外的，老的英伟达驱动对Wayland支持稀烂。在我的台式机上需要配置很多东西才能让它从wayland启动。如果你是arch或者manjaro-unstable，你应该尽可能使用nvidia-open这个包。它是基于英伟达开源的部分内核模块制作的，对于wayland兼容性最好。

之前用闭源驱动的时候，Wayland下NV就算配置好也会出现蜜汁问题。下面这张使我用着用着突然开始窗口拖影的记录

![](https://img-cdn.dustella.net/markdown/20250328164236.png)

关于Wayland，强烈建议阅读ArchWiki上面的相关条目。https://wiki.archlinux.org/title/Wayland

### 输入法

关键词：fcitx5。

在网络上能找到114514篇怎么配置fcitx5的文章。我不再复制黏贴。在这里我用下来最舒服的输入法是Rime+雾凇拼音的方案，详情参考这里：https://github.com/iDvel/rime-ice ，有一篇知乎的教程 https://zhuanlan.zhihu.com/p/676931217

如果你用的是Gnome，强烈推荐安装这个插件，可以让你的输入框更好看，更符合gnome风格；https://extensions.gnome.org/extension/261/kimpanel/

![](https://img-cdn.dustella.net/markdown/20250328164317.png)

### wine/crossover

有些时候还是不可避免地需要运行一些Windows only的软件。有一类软件不通过跑虚拟机，而是直接实现部分Windows的API，让软件能接近原生地跑在Linux上。损耗仅来自于API转译，而没有模拟硬件的开销。

wine提供了不错的转译，但是事实上crossover（https://www.codeweavers.com/crossover）做得更好（里面也用到了wine）。crossover有一些非公开的破解版本，但是社区公开的修改试用期的方案也不是不能用。

### distrobox

这是一个为了跨发行版跑软件的工具，背后其实是docker。https://distrobox.it/

如果你有时间折腾，其实甚至可以自己移植不同发行版的软件。不同发行版之间最大的区别在于依赖。例如Ubuntu还停留在某个比较旧的glibc版本，arch的很新，而用新版本依赖直接老软件往往有问题。如果有时间，你可以去原发行版一个一个把软件的依赖抠出来，然后在ld prefix，甚至用bwrap让它在目标发行版使用自己指定的动态链接库。事实上，aur里面相当多的软件移植都是这么工作的。

distrobox是另一个思路，用容器直接跑另一个发行版。容器内是另一个发行版的完整环境。distrobox帮你打通了一些系统上的隔离，让里面的软件能直接访问你的/home，并且能用宿主机的X11显示GUI。遇到一些Ubuntu/redhat only的软件，这是最方便的办法。

## 日用软件

### QQ和微信

非常庆幸，在2025年，QQ和微信这俩重量级软件终于适配了Linux，而且它们打包的还有appimage版本。我是从icalingua时代用过来的人，官方能做很幸运。

aur上有bwrap的版本 https://aur.archlinux.org/packages/linuxqq-nt-bwrap https://aur.archlinux.org/packages/wechat-universal-bwrap ，提供了部分环境隔离。我很推荐这么做，谁知道这些Linux版本会不会扫你的盘呢

大部分功能是工作的。我可以打QQ电话、微信电话，可以用微信小程序，我甚至可以在上面点瑞幸咖啡。唯一美中不足的是，Linux微信还不支持从手机迁移聊天记录。但是无伤大雅。

### 浏览器

最不需要担心的一集。chrome、edge、Firefox，甚至小众的如brave、Vivaldi都有Linux原生支持。什么？你用360浏览器和夸克？那我祝你好运。

我自己就是前端开发，这些浏览器基本上都没有大的问题，大部分API都能工作。你说webgpu不能跑，HEVC 不解码，那也是很edge case了。

需要注意，只有Firefox有最完整的wayland支持。chrome、edge即使可以通过加flag强开wayland原生，我也强烈不建议这么做。首先，输入法是不工作的，需要额外加一两个flag才能支持wayland下的输入协议。同时我不知道为什么，切到原生wayland后浏览器本身的GUI缩放就坏了。总结来说，老老实实xwayland或者x11，就没有问题。

关于passkey. 我不知道Linux是否能支持部分webauthn，但是bitwarden反正能模拟Fido设备。我有硬件密钥的朋友（有些yubikey用户）说Linux上它们工作的很好。

### 网易云音乐

这是国产软件里适配最一坨的。版本很久没更，而且flac解码从2018年开始到现在一直是坏的，到2025年还没修。社区里有一个bwrap过的包 https://aur.archlinux.org/packages/netease-cloud-music 帮官方修了这个问题。

总之，在账户不被风控的情况下，我更推荐第三方客户端。yesplaymusic虽然停更了，但是还能用，它比官方客户端实在是好了不止一点半点。

如果你有幸自建媒体站，我相信你的解决方案也肯定比网易云音乐好。

### 其他

telegram有官方客户端。discord有官方客户端，但我推荐用网页。照片浏览用默认的，视频播放用VLC。文档和PPT后文说。

## 工作和开发

### office套件

只有WPS是原生Linux软件中最可用的，但即便如此，它也阉割了巨量功能。libreoffice等开源软件几乎不可用。我最主力使用的也就是WPS。

我从未成功用普通wine跑起来过MS office，据说wine能运行office版本大约是2007那个时代的。然而，crossover能比较顺畅地运行office 2016，还算可以接受。

在以上选项都没有的时候，我会用网页版的MS office应急。网页版本的MS office也实现了大部分office客户端的功能，唯一美中不足的是你需要魔法上网才能用它。

### VSCode和其他开发环境

我猜，如果你不是老工控领域写Windows上位机的，或者需要用.net framework那种老框架，绝大部分的工具链都在Linux上非常完整，甚至很多工具链是Linux only。嗯，开发者最爽的部分。

vscode有原生支持。注意，arch官方仓库里的是开源版本的vsc，没有微软登录的部分，也不能用一些插件。AUR中的版本是微软编译的部分闭源的版本（也就是你我在Windows上常用的版本）

### 腾讯会议

对wayland最不友好的部分之一。

腾讯提供了Linux版本，但是在wayland下没办法共享屏幕。这曾经是我过去半年在wayland下让我最不爽的点，也几乎是我临时切回X11的唯一原因。2025年，已经有人通过hook客户端做到了损耗不大的，在wayland下共享屏幕的办法：https://github.com/xuwd1/wemeet-wayland-screenshare

这个方案也被打包进入了这个AUR仓库：https://aur.archlinux.org/packages/wemeet-wayland-screenshare-git

感谢这些大佬。

### Zotero

Zotero 有原生Linux客户端，让它吃我的代理配置花了我不少时间（提示：它本质是个Firefox）其他功能工作的都很好。

### 飞书、钉钉、滴答清单、Notion

网页版，能用，问题不大。

滴答清单有Linux原生版本。

### 远控

说实话，还是免不了控制别的Windows设备。如果你也喜欢用RDP的话，我推荐你使用reminna这个RDP客户端。它对于wayland有不错的原生支持（感谢它的上游GTK）

todesk、向日葵都有Linux版本，但可用性都不太好。我不知道为什么即使我的todeskd是自启的我的todesk也无法使用，必须重启一遍todeskd。当然，他们都没有wayland被控的能力。

## 专业软件

MATLAB能在Ubuntu上跑，我自己做点云用的CloudCompare能跑。其他不清楚。

## 娱乐

### Steam & Proton

steam不仅有Linux原生支持，而且自己做了一个类似于wine的转译层，proton（实际上也是一魔改的wine，但是加了很多游戏相关优化）能跑起来相当多的游戏

### moonlight、parsec串流

两者都有Linux客户端。

wayland下，moonlight的捕获全局快捷键不工作。这是因为wayland设计导致的，compositer（这里是gnome的mutter）负责给应用一个协议让他们申请捕获全局快捷键，否则快捷键的事件根本就不会被发给应用程序。moonlight的上游（SDL）不知道有没有正确实现这一点，但总之我这里它不工作。

普通远控我还是推荐用reminna。它原生就支持wayland下捕获全局快捷键。

### 战网

crossover能比较流畅地运行战网，并且毫无压力地转译炉石传说。我全屏游玩的时候没有问题，但是退出全屏不能正确渲染。

### 其他游戏

很多游戏能用crossover或者wine跑起来。我测试下，植物大战僵尸（包括杂交版）和星际拓荒用crossover都没啥问题。

我自己主要玩的俩游戏，minecraft和factorio，都有Linux原生支持。

### 其他小众需求

我自己持有一个pn532和一个变色空嗅探卡，至于干什么的不太好多说。之前我只在Windows上面见到过一些Windows Only的，用.NET写的很简陋的控制端。

我以为这是使我半年来让我重启进Windows的唯一一次，但是我真的找到了Linux上使用这俩玩意儿的办法。

pn532，实际上Windows上所有GUI的控制软件，本质都是libnfc套件的wrapper，而libnfc本身是跨平台的。libnfc内置了hardnested和darkside这样的工具，也不需要额外的什么软件。而CH340的驱动甚至早就进了Linux内核，所以它甚至都不需要像Windows那样打驱动。

打上libnfc之后，配置文件要手动指定设备和端口，就能让libnfc秒认pn532。不写配置文件死活不认，我也不清楚为什么

至于变色龙，我去翻了好几个它的控制客户端的源码，最终发现它是用语义化的XMODEN控制的。我在 https://github.com/iceman1001/ChameleonMini-rebooted/wiki/Terminal-Commands 找到了指令列表，并且成功用Minicom客户端控制了这个设备，并且用lrzsz上传了dump文件。

最后我并没有因为这两个设备重启进Windows，哈哈。

## 结语

在很奇怪的信创潮流下，国产最重要的几个软件最起码有了基础的Linux支持。如果你是一个开发者，或者从事CS相关内容，比方说整天跑跑训练啥的，我想在轻薄本上面用Linux是没有什么问题的。当然，最好是能有第二台Windows电脑，应急一些非win不可的任务。

有位群友说，不要碰闭源软件，不要碰 Jvav，不要碰单一大公司主导的开源项目，就不会遇见啥问题。但是我对闭源软件也没有太大意见，而实际上它们也将就能跑，要用么也能用。

从2024年7月到2025年2月这段笔记本转了Linux的时间里，续航提升是感知最明显的。原Windows大约2h的续航被拉到了4.5~5.5h，同时我不需要忍受Windows explorer和任务栏的蜜汁bug和卡顿（这真不是开玩笑，我个人觉得 gnome 的任务栏的 bug 比 Windows 11 少很多），能打开更多标签页，跑更多后台。同时，我没有感受到明显的“不能用”的部分，就我的工作而言，它都能完成。

所以，对于标题，我给出的答案是“能”。当然，它还得加上一堆前面说的限定，而且不能对Linux太陌生。

大概和我刷机一样，这个事情大都经不起别人问一句“然后呢”“有什么意义嘛”，但我觉得这些折腾的过程就挺让我快乐的。
