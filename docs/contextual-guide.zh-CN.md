# Build Your Tank Guide 说明

这份文档说明当前 Guest 登录后的 contextual walkthrough 是怎样编排的。它对应产品里的真实引导，不是单独的功能介绍页面。

运行时的主数据来自 [`src/lib/contextualGuide.js`](../src/lib/contextualGuide.js)。每一步都绑定一个路由和一个真实页面元素；Guide 会切换到目标路由，等待目标出现，再显示 spotlight 和说明面板。

## 当前用户流程

1. 用户在登录页输入可选昵称，点击 **Enter as a guest**。
2. 第一次进入 `My tanks` 时，自动打开完整 Guide。
3. Guide 高亮当前步骤对应的真实按钮、卡片、表单或页面区域。
4. 用户点击 **Next**，Guide 按下面的顺序继续；如果下一步在其他页面，Guide 会自动切换路由。
5. 用户可以随时点击 **Back** 回看，点击 **Skip guide** 跳过，最后一步点击 **Finish** 关闭。
6. 之后点击页面顶部 **How it works**，只会打开当前页面相关的步骤。

Guide 打开时，底层页面被遮罩并锁定，用户不会误触真实页面。Guide 自己的按钮仍然可以操作。

## 完整顺序

| 顺序 | 页面路由 | 高亮目标 | 标题 | 这一步说明什么 | 下一步提示 |
| --- | --- | --- | --- | --- | --- |
| 1 | `my-tanks` | `collection` | Meet your workspace | My tanks 集中展示已保存的鱼缸、房间视图和日常照料。 | Open Tank idea to find a starting idea. |
| 2 | `ideas` | `ideas` | Find a starting idea | Tank idea 是示例鱼缸画廊，可以查看鱼、植物、水质状态和配置。 | Open a tank card for inspiration. |
| 3 | `my-tanks` | `new-tank` | Create a tank of your own | New tank 可以创建独立的鱼缸，比较 60cm、120cm、150cm 与同一套家具的比例。 | Choose New tank to open the creation form. |
| 4 | `my-tanks` | `setup` | Build the habitat first | Edit setup 可以修改鱼缸尺寸、玻璃、底床和过滤。 | Open Edit setup to review the habitat fields. |
| 5 | `learn` | `learn-search` | Learn before you choose | Learn 是鱼、植物、设备和养护用品的百科入口。 | Search the encyclopedia for a fish or plant. |
| 6 | `store` | `store` | Bring your world to life | Fish store 把鱼和植物加入当前选中的鱼缸，养护用品进入共享背包。 | Check Shopping for, then choose a store category or product. |
| 7 | `my-tanks` | `observe` | Take a closer look | Observe tank 打开鱼缸近景，可以放大、缩小并查看细节。 | Choose Observe tank, then try zoom in or zoom out. |
| 8 | `my-tanks` | `water` | Understand the water | Water & nutrients 展示 pH、温度、硬度、营养和 CO₂ 等水体信息。 | Explore a water slider and read its status. |
| 9 | `my-tanks` | `resources` | Prepare for daily care | 资源栏和 My bag 展示共享的 coins、饲料、水护理次数和肥料。 | Open My bag to review your shared supplies. |
| 10 | `my-tanks` | `care` | Practice a small daily routine | Feed fish、Change water、Care for plants 将日常操作和资源消耗连接起来。 | Choose Feed fish, Change water or Care for plants. |
| 11 | `my-tanks` | `preview` | Look ahead and reflect | 30 days later 用简化估计帮助用户回顾水体、绿化和空间选择。 | Open 30 days later to review the estimate. |
| 12 | `my-tanks` | `share` | Keep it and pass it on | Save tank 确认浏览器本地保存，Share tank 创建只读快照链接。 | Save tank first, then open Share tank. |

## 每一步的实际数据结构

交互 Guide 使用下面的字段：

```js
{
  id: 'workspace',
  route: 'my-tanks',
  target: 'collection',
  title: 'Meet your workspace',
  text: 'My tanks keeps your saved aquariums, their room view and daily care in one place. Your next step is to open Tank idea for a starting point, then return here when you are ready to build.',
  nextAction: 'Open Tank idea to find a starting idea.'
}
```

- `id`：步骤的稳定标识。
- `route`：这一步应该显示在哪个 hash 路由。
- `target`：页面上的 `data-guide` 值，例如 `data-guide="collection"`。
- `title`：面板标题，告诉用户当前认识的区域。
- `text`：解释“这里可以做什么”。
- `nextAction`：明确告诉用户“下一步可以点击什么”。

页面元素必须先有稳定的目标标记，例如：

```jsx
<section data-guide="collection">
  ...
</section>
```

Guide 会把 `target` 转换成 `[data-guide="..."]`，找到元素后读取它的位置，spotlight 和说明面板都以这个位置为依据。

## 面板如何跟随目标

Guide 不再固定在页面底部。它会测量目标和说明面板的大小，按以下优先级选择位置：

1. 目标下方
2. 目标上方
3. 目标右侧
4. 目标左侧

如果目标靠近屏幕边缘，面板会被限制在视口内。窗口缩放、页面滚动或步骤切换时，位置会重新计算。

## Guide 的运行规则

### 首次登录

Guest 第一次进入工作区时，`App.jsx` 启动完整的 12 步 Guide，并记录浏览器本地标记：

```text
buildyourtank:contextual-guide:seen:v1
```

之后刷新页面不会自动再次打开完整 Guide。

### 跨页面步骤

如果下一步的 `route` 与当前路由不同，Guide 会先修改 hash 路由，然后轮询目标元素。只有目标元素已经渲染且有实际尺寸时，才会显示新的 spotlight。

### 当前页面帮助

点击 **How it works** 时，系统调用 `getCurrentPageGuide(route)`，只筛选当前路由的步骤。例如在 `my-tanks` 页面重新打开时，会显示属于 `my-tanks` 的步骤，而不是重新播放全部 12 步。

### 键盘与遮罩

- `Escape`：跳过 Guide。
- `Tab`：只在 Guide 面板内循环焦点。
- 遮罩捕获底层页面点击，避免误操作。
- spotlight 只用于视觉高亮，不会自动点击真实按钮。

## 文案写法

每一步都按同一套写法组织：

1. 标题说明当前页面区域是什么。
2. `text` 说明这个区域能完成什么，以及为什么现在要看它。
3. `nextAction` 指向一个具体的下一步点击动作。
4. 不替用户执行购买、照料、保存或分享；这些操作由用户自己完成。

例如第 6 步不是只说“这里可以买东西”，而是说明鱼和植物会加入当前选中的鱼缸，养护用品会进入共享背包，并提示用户先确认 **Shopping for**，再选择分类或产品。

## 修改 Guide 的顺序和文案

如果要调整产品里的交互 Guide：

1. 修改 [`src/lib/contextualGuide.js`](../src/lib/contextualGuide.js) 的步骤顺序或字段。
2. 确认对应页面仍然存在匹配的 `data-guide` 目标。
3. 如果录制脚本也要同步，更新 [`src/content/guide.json`](../src/content/guide.json) 的对应步骤。
4. 运行 `npm run guide:script`，重新生成 [`docs/demo-script.md`](./demo-script.md)。
5. 运行 `npm test`、`npm run build` 和 `git diff --check`。

当前项目是 Guest、本地浏览器保存的 Demo，因此 Guide 文案也会明确说明本地保存、只读快照和简化的教育模型，避免让用户误以为已经接入真实账号、云端同步或实时社区数据。
