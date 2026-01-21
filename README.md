# PTmoldTW Injection Molding Tools (塑膠射出數位工具箱)

這是一個專為塑膠射出成型產業 (Injection Molding Industry) 開發的輕量級 JavaScript 工具庫。
旨在透過 CDN 方式，快速將實用的工程計算功能嵌入至任何 CMS 網站（如 WordPress, Joomla 或客製化網站）中。

## 🚀 特色 (Features)

* **輕量化 (Lightweight)**：使用原生 JavaScript (Vanilla JS) 撰寫，無須依賴 jQuery 或其他龐大框架。
* **模組化 (Modular)**：單一檔案包含多種工具，僅需透過 HTML ID 即可觸發特定功能。
* **易於部署 (Easy to Deploy)**：支援 jsDelivr CDN，修改 GitHub 程式碼後，網站端自動更新。
* **響應式設計 (RWD)**：介面自動適應手機與電腦版面。

## 🛠️ 收錄工具 (Tools Included)

目前 `tool.js` 中包含以下四種工具：

1.  **鎖模力估算器 (Clamping Force Calculator)**
    * 依據產品長寬與材料特性，計算建議的機台噸數。
    * 支援材料：PP, ABS, PC, PA, POM...等。
2.  **冷卻時間估算器 (Cooling Time Estimator)**
    * 基於熱傳導公式 (Fourier Number)，依據肉厚與材質熱擴散率估算成型週期。
3.  **射出常用單位換算器 (Unit Converter)**
    * 支援 壓力 (MPa ⇄ kg/cm²)、長度 (mm ⇄ inch)、鎖模力 (Ton ⇄ kN) 雙向換算。
4.  **產能試算機 (Production Capacity Calculator)**
    * 依據成型週期、模穴數與稼動率，計算 UPH (每小時產量) 與日產量。

---

## 💻 安裝方式 (Installation)

### 步驟 1：引入 Script (Add Script)

請在您的網站後台 (如 Google GTM 或 Footer 區域) 加入以下程式碼：

```html
<script src="[https://cdn.jsdelivr.net/gh/jush6000/PTmoldTW-injection-tools@main/main.js](https://cdn.jsdelivr.net/gh/jush6000/PTmoldTW-injection-tools@main/tool.js)"></script>

```

### 步驟 2：放置容器 (Place Container)

在您想要顯示工具的文章或頁面位置，貼上對應的 HTML `div` 標籤。程式碼會自動偵測 ID 並將工具注入該位置。

#### 1. 鎖模力估算器

```html
<div id="clamping-calculator-app"></div>

```

#### 2. 冷卻時間估算器

```html
<div id="cooling-time-app"></div>

```

#### 3. 單位換算器

```html
<div id="unit-converter-app"></div>

```

#### 4. 產能試算機

```html
<div id="production-capacity-app"></div>

```

---

## ⚠️ 注意事項 (Notes)

1. **快取問題**：透過 jsDelivr 引用時，更新 GitHub 後約需 **15~20 分鐘** 才會在網頁上生效。若需強制刷新，可將連結改為 `tool.js?v=2` 等方式測試。
2. **ID 衝突**：請確保單一頁面中不要重複出現相同的 ID。
3. **計算誤差**：所有工具均採用業界通用經驗公式，僅供報價與初步評估參考，精密成型仍建議參考模流分析 (Moldflow) 數據。

## 📝 License

此專案採用 MIT License 開源授權。
Developed for **PTmoldTW (寶泰模具)**.
