---
title: GPG 签名的最佳实践：主密钥与子密钥的分离管理
date: 2025-07-09
---

# GPG 签名的最佳实践：主密钥与子密钥的分离管理

## 前言

我相信很多人效仿一些大佬去用 gpg 签名自己在 Git 上面提交的 commit。我最开始还是个半小白的时候也这么做了，单纯只是觉得这很酷。我相信绝大部分人配置 gpg 签名 commit 都是 跟着下面这两个 Github 写的文档来的：

[Github Docs: Generate a New GPG Key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)

那么问题来了：当你有了一台新的设备之后，你会按照上面的步骤重新来一次吗？或者你比较聪明，去查了以下怎么迁移gpg的私钥，然后把老电脑上面的私钥搬到了新电脑上去。然而，真的应该这么做吗？

笔者是比较愚蠢的前一种。不仅是新的设备，当我新配一个msys环境、一个wsl、一个虚拟机的时候，我也会重新生成一遍 gpg，并且把它再传到 Github 上面去。结果到了一个月前，我的 Github 账号上总共已经有了 12 个不同的 gpg 主密钥。

等等，什么是主密钥？为什么这种实践不合理？gpg 设计上是让你怎么做的？接下来我介绍一下我探索出来的（笔者认为合理的）实践。

## GPG，主密钥和子密钥

Okay，这么说话还是听拗口的。我们还是叫他们的原始名字，Primary key 和 Subkey。

上面提到的 Github 官方教程，它做的事情，其实是生成了一对 Primary key 和绑定了它的 subkey。生成的时候其实分别给 primary key 和 subkey 生成了公钥私钥对。正如大家所熟悉的非对称加密工作的原理那样，我应该把公钥分发给别人，把私钥安全保存在某个地方。我用私钥去签名我的东西，别人用公钥可以解密./认证。我们在 Github 上传的公钥同时带有了 Primary key 和 Subkey 的公钥。

可是，为什么要有主密钥和子密钥？

你的 key 是有风险泄露的，要承认你把私钥漏出去的可能性。所以，**你的主密钥是高度保密的，而且理论上不应该分发**，你要我说，主密钥不应当存在与内存或者硬盘里——或者你也可以把它放在完全离线的设备里。

等等，完全不放在内存或者硬盘里？

是的。我们可以用特制的安全芯片，让这个芯片代替我们去做签名、加密的工作，保证私钥不经过主机的内存，也不会存在于你的硬盘里。这个安全芯片可以是外置的 Yubikey 、Canokey 甚至你电脑里自带的 TPM 。另一类设备也能做同样的事情，叫SmartCard。

因此，最安全的实践是：

- 购买一个 Yubikey 或者 Canokey，用这俩硬件去生成密钥对。
- 随身携带这个硬件，用的时候插到电脑上用来签名
- 控制远程设备的时候，把自己的 gpg agent forward 过去来签名

如果你所有的设备都是 Linux 设备，那你也可以用电脑自带的 TPM 管理 gpg 私钥，详见后文。

但是，你肯定会说，我没有 Yubikey，而且我不想买一个。没关系！你可以把 Primary key 只保留到一个完全离线的设备里，也能达到近似的”主密钥安全性“。

具体来说，你应该这么做：

首先，准备一个完全离线的机器。可以是超级老的笔记本，甚至树莓派。给它安装了一个干净的发行版，并且安装好gpg和基本的工具。确保按照安装完成之后这台机器永久离线。

1. 生成主密钥（离线环境）

```bash
# 在断网的物理机或虚拟机中操作
gpg --full-generate-key --expert

```

- 选择 `(8) RSA (set your own capabilities)`
- 取消所有能力（按 `S`/`E`/`A` 移除签名/加密/认证），只保留 `Certify`（主密钥仅用于证书签发）
- 设置 4096 位长度和合理有效期（如 2 年）
- 如果你想要把私钥转移到 TPM 或者别的 SmartCard 类设备上，还是推荐你用RSA，因为兼容性最好

2. 生成子密钥
   既然在这台离线设备中操作

```bash
gpg --list-keys --keyid-format=long # 查看你刚刚生成的 keyid
gpg --edit-key KEYID # 也可以用邮箱（uid），如果你只有一个密钥
```

依次添加子密钥：

```text
addkey
→ RSA (sign only)  # 用于 commit 签名
addkey
→ RSA (encrypt only)  # 可选，用于加密通信
addkey
→ RSA (authenticate only)  # 可选，用于 SSH 认证

# 如果你只用一两个，就只生成一两个
```

每个子密钥建议设置更短的有效期（如 90 天，但是我选择一年）

3. 备份与转移

用指令可以从离线设备中导出私钥。

注意：只导出subkey的私钥，在别的设备上永远只使用subkey的私钥，Primary key 的私钥应当永久存储在你的离线设备上，从未脱离过那个设备。

这样，你的 Primary key is never compromised. 假设你某天某个私钥泄露了，就再次启动这个离线设备，为泄露的私钥颁发吊销证书。

建议用加密U盘转移密钥文件

```bash
# 导出主密钥和 subkey 的公钥
# 记住，你还是需要对外分发 primary key 的公钥
gpg --armor --export KEYID > pubkey.pub

# 导出主密钥（严格保密，只导出subkey的私钥）
gpg --armor --export-secret-subkeys KEYID > subkeys.key

```

然后，把两个文件用 U 盘拷贝到第二台电脑

```bash
# 先导入公钥
gpg --import pubkey.pub

# 将 subkeys.key 导入日常设备
gpg --import subkeys.key

4. 配置 Git 签名
```

```bash
# 指定签名用的子密钥
git config --global user.signingkey SIGN_SUBKEY_ID

# 启用自动签名
git config --global commit.gpgsign true

```

5. 硬件密钥方案（Yubikey、TPM 示例）

注意，我的TPM不支持ed25519这种圆锥曲线的算法，建议继续用RSA

```bash
gpg --edit-key KEYID
key 1  # 选择签名子密钥
keytocard
→ Signature key  # 写入硬件
keytotpm
->
```

6. 密钥吊销证书

```bash
# 提前生成并保存（离线环境）
gpg --gen-revoke KEYID > revoke.asc

```

---

## 注意：

1. **密钥分离，**日常设备仅保留子密钥私钥，主密钥私钥永不联网
2. **Troubleshooting**：
   - `export GPG_TTY=$(tty)` 解决终端签名问题
   - `gpgconf --kill gpg-agent` 重启代理服务

有了这种这种分层密钥管理，即使子密钥泄露，也只需吊销单个子密钥而无需重建整个身份体系。Yubikey 等硬件设备则进一步将攻击面缩小到物理接触维度。

## 我已经签名了那么多commit，我能删掉以前的公钥吗？

答案是：可以，而且你不会丢掉以前 commit 的验证状态。

https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification#persistent-commit-signature-verification

Github 验证你的签名只在你 push 的那一瞬间，之后这个 Verification 就是永久化的。你删除老的公钥不会影响旧的commit的验证状态。

所以，大胆地删除你原先不安全的 Primary key 吧。
