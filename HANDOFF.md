# 專案交接文件：雙耳節拍與純音體驗

更新日期：2026-08-23（Asia/Taipei）  
產品版本：`v1.1.0`  
目前 Git 提交：`100bbcd`（`docs: simplify Gamma v1.1.0 copy`）

## 1. 專案位置與快速啟動

| 項目 | 資訊 |
| --- | --- |
| 本機專案路徑 | `/Users/cloudhuamacmini/Documents/ChatGPT/Task Board` |
| 入口頁 | `index.html` |
| 主程式 | `app.js` |
| 樣式 | `styles.css` |
| 變更紀錄 | `CHANGELOG.md` |
| 本文件 | `HANDOFF.md` |

此專案是無建置步驟的靜態網站。可直接以瀏覽器開啟 `index.html`；需要以 HTTP 實測時，在專案目錄執行：

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

再開啟 `http://127.0.0.1:8000/`。指定語言可用查詢參數，例如 `?lang=en`、`?lang=zh-Hant`。

### 根目錄完整檔案與目錄清單

以下是本次盤點時專案根目錄下的全部項目；所有路徑皆為本機絕對路徑。

| 類型 | 絕對位置 | 用途／處理原則 |
| --- | --- | --- |
| 目錄 | `/Users/cloudhuamacmini/Documents/ChatGPT/Task Board/.git` | Git 中繼資料與版本歷史；勿手動修改。 |
| 目錄 | `/Users/cloudhuamacmini/Documents/ChatGPT/Task Board/.rollback-backups` | 既有未追蹤回復備份；一般提交、清理與覆寫時應排除。 |
| 目錄 | `/Users/cloudhuamacmini/Documents/ChatGPT/Task Board/.rollback-backups/local-3-before-meditation-revert` | 佛教情境版回退前的備份快照。 |
| 檔案 | `/Users/cloudhuamacmini/Documents/ChatGPT/Task Board/.rollback-backups/local-3-before-meditation-revert/app.js` | 回退前 JavaScript 備份。 |
| 檔案 | `/Users/cloudhuamacmini/Documents/ChatGPT/Task Board/.rollback-backups/local-3-before-meditation-revert/index.html` | 回退前 HTML 備份。 |
| 檔案 | `/Users/cloudhuamacmini/Documents/ChatGPT/Task Board/.rollback-backups/local-3-before-meditation-revert/styles.css` | 回退前 CSS 備份。 |
| 檔案 | `/Users/cloudhuamacmini/Documents/ChatGPT/Task Board/app.js` | 主程式：音訊、互動、多語與排序。 |
| 檔案 | `/Users/cloudhuamacmini/Documents/ChatGPT/Task Board/index.html` | 靜態頁面結構、預設中文文案與外部研究連結。 |
| 檔案 | `/Users/cloudhuamacmini/Documents/ChatGPT/Task Board/styles.css` | 網頁視覺、響應式版面與拖曳狀態。 |
| 檔案 | `/Users/cloudhuamacmini/Documents/ChatGPT/Task Board/CHANGELOG.md` | 版本變更與回復說明。 |
| 檔案 | `/Users/cloudhuamacmini/Documents/ChatGPT/Task Board/HANDOFF.md` | 本交接文件。 |

## 2. 產品範圍與使用界限

產品定位是「雙耳節拍與純音的個人聲音體驗／實驗工具」，並非醫療或治療產品。

- 六張技術頻段卡：Alpha、Beta、Gamma、Theta、Delta、Pure Tone。
- 使用情境僅用於協助選擇聲音；不宣稱誘發腦波、改善能力、疾病或睡眠。
- 預設低音量；介面包含耳機、耳鳴／不適／頭痛、駕駛與騎車時勿使用耳機的安全提醒。
- 研究區保留四個 PubMed 連結，並明示研究結果混合、仍需高品質研究。

## 3. 主程式檔案與責任

### `index.html`

頁面結構與預設繁中文案。

- 頂部狀態、九語語言選單與播放／停止按鈕。
- 六張預設卡片，`data-preset` 分別為 `alpha`、`beta`、`gamma`、`theta`、`delta`、`focus`。
- 頻率、載波、音量、波形、模式與 10／20／30 分鐘計時控制。
- 安全及研究區；頁尾含版權、Privacy Policy／Terms of Service 預留連結與 `Version 1.1.0`。

### `app.js`

主要互動、Web Audio、翻譯與卡片排序程式。

- `presets`：六張卡的名稱、節拍、載波、模式與動態描述來源。
- `nodes`：集中保存 DOM 節點。
- `languages`、`localizedText`：九語翻譯。翻譯流程以初始文字節點作為鍵值，因此修改可見繁中文案時，必須同時更新相對應翻譯鍵值。
- `translatePage()`：切換全頁文字與 ARIA 文字。
- `setupPresetSorting()`、`saveCardPosition()`：桌面原生拖放與手機長按拖曳；順序儲存於 `localStorage` 的 `frequency-studio-preset-order`。
- `applyPreset()`：套用卡片參數並更新動態描述。
- `playBinaural()`、`playPulse()`、`playTone()`：Web Audio 三種播放方式。
- `startSound()`、`stopSound()`、`startTimer()`：播放／停止與定時淡出控制。

### `styles.css`

版面與互動狀態樣式。

- `.preset-grid`、`.preset-card`：六卡網格與固定高度。
- `.dragging`、`.drop-target`：拖曳中與落點提示。
- `.drag-handle`：手機可見的長按拖曳把手。
- `@media (max-width: 860px)`、`@media (max-width: 560px)`：平板／手機排版。

### `CHANGELOG.md`

記錄 `v1.1.0` 的定位、文案、安全／研究範圍，以及 `v1.0.1-baseline` 的回復方式。

## 4. 目前文案重點

Gamma／創造力卡的最終繁中文案為：

> 投入任務前的短暫高節奏暖身，適合創作啟動與思緒切換。

此文字同時存在於 `index.html` 的卡片與 `app.js` 的 `presets.gamma.description`；其他八種語言由 `gammaUsageSituationCopy` 覆寫。若調整這句，三處必須維持一致。

## 5. 多語與排序注意事項

- 支援語言：繁中、簡中、English、Hindi、Spanish、French、Arabic、Japanese、Korean。
- 不要移除 `originalTextNodes`：它讓切換語言時仍可回到原始繁中文字串進行翻譯。
- 排序僅針對六張預設卡。桌面可抓取整卡拖放；手機從把手長按拖動。
- 卡片的 `data-preset` 不可因排序而變動，否則將套用錯誤的聲音參數。

## 6. 驗證清單

修改後至少執行：

```bash
node --check app.js
git diff --check
```

瀏覽器驗證建議：

1. 載入繁中，檢查卡片、動態描述與研究／頁尾內容。
2. 載入 `?lang=en`，檢查可見 DOM 無繁中殘留。
3. 點選各頻段卡，確認節拍、載波、模式與描述同步更新。
4. 實測播放、停止及 10／20／30 分鐘計時選項。
5. 桌面拖放卡片後重新載入，確認排序由 `localStorage` 保留。
6. 手機寬度（例如 390px）檢查無水平溢出，並確認拖曳把手可見。

## 7. Git 版本與回復

| 版本 | 提交／標籤 | 用途 |
| --- | --- | --- |
| 目前版本 | `100bbcd`、`v1.1.0` | v1.1.0 最終 Gamma 精簡文案 |
| 基線 | `3ee997c`、`v1.0.1-baseline` | v1.1.0 之前的可回復產品基線 |

回復目前 `v1.1.0` 的產品檔：

```bash
git checkout v1.1.0 -- app.js index.html CHANGELOG.md
```

回復 v1.0.1 基線產品檔：

```bash
git checkout v1.0.1-baseline -- app.js index.html styles.css
```

注意：`.rollback-backups/` 是既有未追蹤的回復備份目錄；不要在一般提交中加入、刪除或覆寫它。

## 8. Taskboard 狀態

Taskboard 任務：`LOCAL-3`。最近一次工作已完成驗證並移至 `in_review`。後續若接續實作，先讀取該任務與所有留言，再以最新版本重新認領。
