## MODIFIED Requirements

### Requirement: Hero Section 展示个人信息

系统 SHALL 在页面首屏渲染一个全屏高度（100dvh）的 Hero 区域，居中展示用户的姓名、职业、一句话介绍和一个 CTA 按钮。

#### Scenario: 正常渲染 Hero

- **GIVEN** 用户打开网站
- **WHEN** 页面加载完成
- **THEN** Hero 区域占据视口 100% 高度
- **THEN** 姓名以最大号字体居中显示
- **THEN** 职业和介绍文字紧随姓名下方，内容反映 AI/金融科技方向
- **THEN** CTA 按钮「查看我的项目」展示在介绍文字下方
