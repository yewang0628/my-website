## MODIFIED Requirements

### Requirement: Hero Section 展示个人信息

系统 SHALL 在页面首屏渲染一个全屏高度（100dvh）的 Hero 区域，居中展示用户的姓名、职业、一句话介绍和一个 CTA 按钮。

#### Scenario: 正常渲染 Hero

- **GIVEN** 用户打开网站
- **WHEN** 页面加载完成
- **THEN** Hero 区域占据视口 100% 高度
- **THEN** 姓名以最大号字体居中显示
- **THEN** 职业和介绍文字紧随姓名下方
- **THEN** CTA 按钮「查看我的项目」展示在介绍文字下方

#### Scenario: 窗口缩放后保持全屏

- **GIVEN** Hero 区域已渲染
- **WHEN** 用户调整浏览器窗口大小
- **THEN** Hero 区域高度始终等于新的视口高度（100dvh）

### Requirement: CTA 按钮锚点跳转

Hero 中的 CTA 按钮 SHALL 使用锚点链接 `#projects`，点击后平滑滚动至 Projects 区域。

#### Scenario: 点击 CTA 按钮跳转

- **GIVEN** Hero 和 Projects 区域均已渲染
- **WHEN** 用户点击「查看我的项目」按钮
- **THEN** 页面平滑滚动至 `id="projects"` 区域
- **THEN** URL hash 变为 `#projects`

#### Scenario: Projects 不存在时的降级（边界/异常）

- **GIVEN** 页面上没有 `#projects` 元素
- **WHEN** 用户点击 CTA 按钮
- **THEN** URL hash 变为 `#projects`，页面保持在当前位置
- **THEN** 不抛出异常或报错
