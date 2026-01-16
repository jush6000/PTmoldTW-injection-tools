document.addEventListener("DOMContentLoaded", function() {

    // ============================================================
    // 模組 1：鎖模力估算器 (Clamping Force Calculator)
    // 對應 HTML ID: <div id="clamping-calculator-app"></div>
    // ============================================================
    var clampingID = "clamping-calculator-app";
    var clampingContainer = document.getElementById(clampingID);

    if (clampingContainer) {
        console.log("正在載入：鎖模力估算器...");

        // --- 1. 定義材料數據 ---
        var materials = [
            { name: "PP / PE (聚丙烯/聚乙烯)", pressure: 300 },
            { name: "PS / ABS (通用塑料)", pressure: 350 },
            { name: "PA / POM (尼龍/縮醛)", pressure: 600 },
            { name: "PC / PMMA (聚碳酸酯/壓克力)", pressure: 700 },
            { name: "PC+GF / PA+GF (加玻纖)", pressure: 800 }
        ];

        // --- 2. 建立介面 UI ---
        var optionsHtml = materials.map(function(m) {
            return '<option value="' + m.pressure + '">' + m.name + '</option>';
        }).join('');
        
        clampingContainer.innerHTML = 
            '<div style="background:#fff; padding:25px; border:1px solid #ddd; border-radius:10px; max-width:500px; margin:0 auto; box-shadow:0 4px 10px rgba(0,0,0,0.05);">' +
                '<h3 style="margin-top:0; color:#333; text-align:center; border-bottom:2px solid #007bff; padding-bottom:10px; margin-bottom:20px;">🛠️ 鎖模力估算器</h3>' +
                
                '<div style="margin-bottom:15px;">' +
                    '<label style="display:block; font-weight:bold; margin-bottom:5px;">1. 產品投影面積 (cm²)</label>' +
                    '<input type="number" id="c-area" style="width:100%; padding:10px; box-sizing:border-box; border:1px solid #ccc; border-radius:5px; font-size:16px;" placeholder="輸入面積...">' +
                '</div>' +

                '<div style="margin-bottom:15px;">' +
                    '<label style="display:block; font-weight:bold; margin-bottom:5px;">2. 塑料材質</label>' +
                    '<select id="c-mat" style="width:100%; padding:10px; box-sizing:border-box; border:1px solid #ccc; border-radius:5px; font-size:16px; background:white;">' +
                        optionsHtml +
                    '</select>' +
                '</div>' +

                '<div style="margin-bottom:20px;">' +
                    '<label style="display:block; font-weight:bold; margin-bottom:5px;">3. 安全係數 (建議 1.2)</label>' +
                    '<input type="number" id="c-safe" value="1.2" step="0.1" style="width:100%; padding:10px; box-sizing:border-box; border:1px solid #ccc; border-radius:5px; font-size:16px;">' +
                '</div>' +

                '<button id="c-btn" style="width:100%; background:#007bff; color:#fff; padding:12px; border:none; border-radius:5px; cursor:pointer; font-size:18px; font-weight:bold; transition:0.3s;">開始計算</button>' +

                '<div id="c-res" style="margin-top:20px; padding:15px; background:#f1f3f5; color:#d9534f; font-weight:bold; display:none; border-radius:5px; text-align:center; border:1px solid #dee2e6;"></div>' +
            '</div>';

        // --- 3. 綁定計算邏輯 ---
        document.getElementById("c-btn").addEventListener("click", function() {
            var area = parseFloat(document.getElementById("c-area").value);
            var pressure = parseFloat(document.getElementById("c-mat").value);
            var safe = parseFloat(document.getElementById("c-safe").value);

            if (!area || area <= 0) {
                alert("請輸入正確的投影面積！");
                return;
            }

            var force = (area * pressure / 1000) * safe;
            
            var resBox = document.getElementById("c-res");
            resBox.style.display = "block";
            resBox.innerHTML = '<span style="color:#333; font-size:14px;">建議最小鎖模力：</span><br><span style="font-size:28px;">' + force.toFixed(1) + '</span> <span style="font-size:16px;">噸 (Tons)</span>';
        });
    }

    // ============================================================
    // 模組 2：(預留位置) 冷卻時間估算器
    // 對應 HTML ID: <div id="cooling-time-app"></div>
    // ============================================================
    var coolingID = "cooling-time-app"; // 未來如果要寫冷卻計算，ID就取這個
    var coolingContainer = document.getElementById(coolingID);

    if (coolingContainer) {
        // 未來這裡可以寫第二個工具的程式碼...
        console.log("正在載入：冷卻時間估算器...");
        coolingContainer.innerHTML = "<h3>🚧 冷卻時間計算功能開發中...</h3>";
    }

});
