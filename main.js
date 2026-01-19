document.addEventListener("DOMContentLoaded", function() {

    // ============================================================
    // 模組 1：鎖模力估算器 (升級版：支援長寬輸入)
    // ============================================================
    var clampingID = "clamping-calculator-app";
    var clampingContainer = document.getElementById(clampingID);

    if (clampingContainer) {
        console.log("正在載入：鎖模力估算器 (L x W 版)...");

        // --- 1. 定義材料數據 ---
        var materials = [
            { name: "PP / PE (聚丙烯/聚乙烯)", pressure: 300 },
            { name: "PS / ABS (通用塑料)", pressure: 350 },
            { name: "PA / POM (尼龍/縮醛)", pressure: 600 },
            { name: "PC / PMMA (聚碳酸酯/壓克力)", pressure: 700 },
            { name: "PC+GF / PA+GF (加玻纖)", pressure: 800 }
        ];

        var optionsHtml = materials.map(function(m) {
            return '<option value="' + m.pressure + '">' + m.name + '</option>';
        }).join('');
        
        // --- 2. 建立介面 (改為長與寬兩個輸入框) ---
        clampingContainer.innerHTML = 
            '<div style="background:#fff; padding:25px; border:1px solid #ddd; border-radius:10px; max-width:500px; margin:0 auto; box-shadow:0 4px 10px rgba(0,0,0,0.05);">' +
                '<h3 style="margin-top:0; color:#333; text-align:center; border-bottom:2px solid #007bff; padding-bottom:10px; margin-bottom:20px;">🛠️ 鎖模力估算器</h3>' +
                
                '<div style="display:flex; gap:10px; margin-bottom:15px;">' +
                    '<div style="flex:1;">' +
                        '<label style="display:block; font-weight:bold; margin-bottom:5px;">長度 (L)</label>' +
                        '<input type="number" id="c-len" style="width:100%; padding:10px; box-sizing:border-box; border:1px solid #ccc; border-radius:5px; font-size:16px;" placeholder="cm">' +
                    '</div>' +
                    '<div style="flex:1;">' +
                        '<label style="display:block; font-weight:bold; margin-bottom:5px;">寬度 (W)</label>' +
                        '<input type="number" id="c-wid" style="width:100%; padding:10px; box-sizing:border-box; border:1px solid #ccc; border-radius:5px; font-size:16px;" placeholder="cm">' +
                    '</div>' +
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

        // --- 3. 綁定計算邏輯 (自動計算面積) ---
        document.getElementById("c-btn").addEventListener("click", function() {
            var len = parseFloat(document.getElementById("c-len").value);
            var wid = parseFloat(document.getElementById("c-wid").value);
            var pressure = parseFloat(document.getElementById("c-mat").value);
            var safe = parseFloat(document.getElementById("c-safe").value);

            // 驗證輸入
            if (!len || len <= 0 || !wid || wid <= 0) {
                alert("請輸入正確的長度與寬度！");
                return;
            }

            // 自動算出面積
            var area = len * wid;

            // 公式計算
            var force = (area * pressure / 1000) * safe;
            
            var resBox = document.getElementById("c-res");
            resBox.style.display = "block";
            resBox.innerHTML = 
                '<span style="color:#555; font-size:14px;">投影面積：' + area.toFixed(1) + ' cm²</span><br>' +
                '<hr style="margin:10px 0; border:0; border-top:1px solid #ddd;">' +
                '<span style="color:#333; font-size:14px;">建議最小鎖模力：</span><br>' + 
                '<span style="font-size:28px;">' + force.toFixed(1) + '</span> <span style="font-size:16px;">噸 (Tons)</span>';
        });
    }

    // ============================================================
    // 工具 2：冷卻時間估算器 (Cooling Time Estimator)
    // ============================================================
    var coolingContainer = document.getElementById("cooling-time-app");
    if (coolingContainer) {
        console.log("載入冷卻時間計算機...");

        // 定義熱傳導數據 (Effective Diffusivity for simplified calculation)
        // 這裡採用簡化經驗係數，方便使用者快速估算
        var coolMaterials = [
            { name: "PP (聚丙烯)", alpha: 0.096, tm: 230, tw: 40, te: 90 }, // alpha: 熱擴散率, tm:料溫, tw:模溫, te:頂出溫
            { name: "PE (聚乙烯)", alpha: 0.10, tm: 210, tw: 40, te: 80 },
            { name: "ABS (通用級)", alpha: 0.086, tm: 230, tw: 60, te: 95 },
            { name: "PC (聚碳酸酯)", alpha: 0.10, tm: 300, tw: 90, te: 135 },
            { name: "PA66 (尼龍66)", alpha: 0.095, tm: 280, tw: 80, te: 120 },
            { name: "POM (塑鋼)", alpha: 0.088, tm: 200, tw: 90, te: 130 }
        ];

        var matOptions = coolMaterials.map(function(m, index){
            return '<option value="'+index+'">'+m.name+'</option>';
        }).join('');

        coolingContainer.innerHTML = 
            '<div style="background:#fff; padding:25px; border:1px solid #ddd; border-radius:10px; max-width:500px; margin:0 auto; box-shadow:0 4px 10px rgba(0,0,0,0.05);">' +
                '<h3 style="margin-top:0; color:#28a745; text-align:center; border-bottom:2px solid #28a745; padding-bottom:10px; margin-bottom:20px;">⏱️ 冷卻時間估算器</h3>' +
                
                '<div style="margin-bottom:15px;">' +
                    '<label style="display:block; font-weight:bold; margin-bottom:5px;">1. 產品肉厚 (Max Wall Thickness)</label>' +
                    '<div style="display:flex; align-items:center;">' +
                        '<input type="number" id="t-thick" style="width:100%; padding:10px; box-sizing:border-box; border:1px solid #ccc; border-radius:5px; font-size:16px;" placeholder="單位：mm" step="0.1">' +
                        '<span style="margin-left:10px; font-weight:bold;">mm</span>' +
                    '</div>' +
                    '<div style="font-size:12px; color:#888; margin-top:5px;">*請輸入產品最厚處的尺寸</div>' +
                '</div>' +

                '<div style="margin-bottom:20px;">' +
                    '<label style="display:block; font-weight:bold; margin-bottom:5px;">2. 塑料材質</label>' +
                    '<select id="t-mat" style="width:100%; padding:10px; box-sizing:border-box; border:1px solid #ccc; border-radius:5px; font-size:16px; background:white;">'+matOptions+'</select>' +
                '</div>' +

                '<button id="t-btn" style="width:100%; background:#28a745; color:#fff; padding:12px; border:none; border-radius:5px; cursor:pointer; font-size:18px; font-weight:bold; transition:0.3s;">計算時間</button>' +

                '<div id="t-res" style="margin-top:20px; padding:15px; background:#e8f5e9; color:#2e7d32; font-weight:bold; display:none; border-radius:5px; text-align:center; border:1px solid #c8e6c9;"></div>' +
            '</div>';

        document.getElementById("t-btn").addEventListener("click", function() {
            var h = parseFloat(document.getElementById("t-thick").value); // mm
            var matIndex = document.getElementById("t-mat").value;
            var mat = coolMaterials[matIndex];

            if (!h || h <= 0) { alert("請輸入正確的肉厚 (mm)"); return; }

            // === 核心公式 (Standard Cooling Time Equation) ===
            // t = (h^2 / (pi^2 * alpha)) * ln( (4/pi) * (Tm - Tw) / (Te - Tw) )
            
            var alpha = mat.alpha; // 熱擴散率
            var Tm = mat.tm; // 料溫
            var Tw = mat.tw; // 模溫
            var Te = mat.te; // 頂出溫
            
            var pi = Math.PI;
            var term1 = (h * h) / (pi * pi * alpha);
            var term2 = Math.log( (4/pi) * (Tm - Tw) / (Te - Tw) );
            
            var time = term1 * term2;

            var resBox = document.getElementById("t-res");
            resBox.style.display = "block";
            resBox.innerHTML = 
                '<span style="color:#555; font-size:14px;">參考材質：'+mat.name+'</span><br>' +
                '<hr style="margin:10px 0; border:0; border-top:1px solid #a5d6a7;">' +
                '<span style="color:#2e7d32; font-size:14px;">理論冷卻時間：</span><br>' + 
                '<span style="font-size:32px;">' + time.toFixed(1) + '</span> <span style="font-size:18px;">秒 (sec)</span>';
        });
    }
});
