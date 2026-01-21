document.addEventListener("DOMContentLoaded", function() {

    // ============================================================
    // 模組 1：鎖模力估算器
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
    // ============================================================
    // 工具 3：單位換算器 (Unit Converter)
    // ID: unit-converter-app
    // ============================================================
    var unitContainer = document.getElementById("unit-converter-app");
    if (unitContainer) {
        console.log("載入工具 3：單位換算器...");
        
        unitContainer.innerHTML = 
            '<div style="background:#fff; padding:25px; border:1px solid #ddd; border-radius:10px; max-width:500px; margin:0 auto; box-shadow:0 4px 10px rgba(0,0,0,0.05);">' +
                '<h3 style="margin-top:0; color:#6f42c1; text-align:center; border-bottom:2px solid #6f42c1; padding-bottom:10px; margin-bottom:20px;">🔄 射出常用單位換算</h3>' +
                '<div style="margin-bottom:20px; background:#f8f9fa; padding:15px; border-radius:8px;">' +
                    '<label style="display:block; font-weight:bold; margin-bottom:10px; color:#333;">1. 壓力 (Pressure)</label>' +
                    '<div style="display:flex; gap:10px; align-items:center;"><input type="number" id="u-mpa" placeholder="MPa" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;"><span style="font-weight:bold;">⇄</span><input type="number" id="u-kg" placeholder="kg/cm²" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;"></div>' +
                '</div>' +
                '<div style="margin-bottom:20px; background:#f8f9fa; padding:15px; border-radius:8px;">' +
                    '<label style="display:block; font-weight:bold; margin-bottom:10px; color:#333;">2. 長度 (Length)</label>' +
                    '<div style="display:flex; gap:10px; align-items:center;"><input type="number" id="u-mm" placeholder="mm" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;"><span style="font-weight:bold;">⇄</span><input type="number" id="u-inch" placeholder="inch" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;"></div>' +
                '</div>' +
                 '<div style="background:#f8f9fa; padding:15px; border-radius:8px;">' +
                    '<label style="display:block; font-weight:bold; margin-bottom:10px; color:#333;">3. 鎖模力 (Force)</label>' +
                    '<div style="display:flex; gap:10px; align-items:center;"><input type="number" id="u-ton" placeholder="Ton (噸)" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;"><span style="font-weight:bold;">⇄</span><input type="number" id="u-kn" placeholder="kN" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;"></div>' +
                '</div>' +
            '</div>';

        // 綁定計算
        var mpa = document.getElementById("u-mpa"), kg = document.getElementById("u-kg");
        mpa.addEventListener("input", function(){ kg.value = (this.value * 10.197).toFixed(1); });
        kg.addEventListener("input", function(){ mpa.value = (this.value / 10.197).toFixed(1); });

        var mm = document.getElementById("u-mm"), inch = document.getElementById("u-inch");
        mm.addEventListener("input", function(){ inch.value = (this.value / 25.4).toFixed(3); });
        inch.addEventListener("input", function(){ mm.value = (this.value * 25.4).toFixed(2); });

        var ton = document.getElementById("u-ton"), kn = document.getElementById("u-kn");
        ton.addEventListener("input", function(){ kn.value = (this.value * 9.807).toFixed(1); });
        kn.addEventListener("input", function(){ ton.value = (this.value / 9.807).toFixed(1); });
    }
    // ============================================================
    // 工具 4：[新增] 產能試算機 (Production Capacity)
    // ID: production-capacity-app
    // ============================================================
    var prodContainer = document.getElementById("production-capacity-app");
    if (prodContainer) {
        console.log("載入工具 4：產能試算...");
        
        prodContainer.innerHTML = 
            '<div style="background:#fff; padding:25px; border:1px solid #ddd; border-radius:10px; max-width:500px; margin:0 auto; box-shadow:0 4px 10px rgba(0,0,0,0.05);">' +
                '<h3 style="margin-top:0; color:#dc3545; text-align:center; border-bottom:2px solid #dc3545; padding-bottom:10px; margin-bottom:20px;">🏭 射出產能試算機</h3>' +
                
                '<div style="display:flex; gap:15px; margin-bottom:15px;">' +
                    '<div style="flex:1;">' +
                        '<label style="display:block; font-weight:bold; margin-bottom:5px;">成型週期 (秒)</label>' +
                        '<input type="number" id="p-cycle" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:5px;" placeholder="Cycle Time">' +
                    '</div>' +
                    '<div style="flex:1;">' +
                        '<label style="display:block; font-weight:bold; margin-bottom:5px;">模穴數 (穴)</label>' +
                        '<input type="number" id="p-cavity" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:5px;" placeholder="Cavities">' +
                    '</div>' +
                '</div>' +

                '<div style="margin-bottom:15px;">' +
                    '<label style="display:block; font-weight:bold; margin-bottom:5px;">工作時數 (小時/天)</label>' +
                    '<select id="p-hours" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:5px; background:white;">' +
                        '<option value="8">8 小時 (單班)</option>' +
                        '<option value="12">12 小時 (1.5班)</option>' +
                        '<option value="24">24 小時 (全天)</option>' +
                        '<option value="custom">自訂...</option>' +
                    '</select>' +
                    '<input type="number" id="p-hours-custom" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:5px; margin-top:5px; display:none;" placeholder="輸入時數">' +
                '</div>' +

                '<div style="margin-bottom:20px;">' +
                    '<label style="display:block; font-weight:bold; margin-bottom:5px;">稼動率 (%)</label>' +
                    '<input type="number" id="p-efficiency" value="90" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:5px;">' +
                    '<div style="font-size:12px; color:#888;">*扣除換模、故障等停機時間 (建議 85-95%)</div>' +
                '</div>' +

                '<button id="p-btn" style="width:100%; background:#dc3545; color:#fff; padding:12px; border:none; border-radius:5px; cursor:pointer; font-weight:bold; font-size:16px;">計算產量</button>' +

                '<div id="p-res" style="margin-top:20px; padding:15px; background:#f8d7da; color:#721c24; border-radius:5px; display:none; border:1px solid #f5c6cb;"></div>' +
            '</div>';

        // 處理自訂時數顯示
        document.getElementById("p-hours").addEventListener("change", function() {
            var customInput = document.getElementById("p-hours-custom");
            if (this.value === "custom") {
                customInput.style.display = "block";
            } else {
                customInput.style.display = "none";
            }
        });

        // 計算邏輯
        document.getElementById("p-btn").addEventListener("click", function() {
            var cycle = parseFloat(document.getElementById("p-cycle").value);
            var cavity = parseFloat(document.getElementById("p-cavity").value);
            var eff = parseFloat(document.getElementById("p-efficiency").value) / 100;
            
            var hours = document.getElementById("p-hours").value;
            if (hours === "custom") {
                hours = parseFloat(document.getElementById("p-hours-custom").value);
            } else {
                hours = parseFloat(hours);
            }

            if (!cycle || !cavity || !hours) return alert("請輸入完整數據");

            // 公式：(3600秒 / 週期) * 穴數 * 時數 * 稼動率
            var hourlyOutput = (3600 / cycle) * cavity * eff;
            var dailyOutput = hourlyOutput * hours;

            var resBox = document.getElementById("p-res");
            resBox.style.display = "block";
            resBox.innerHTML = 
                '<div style="display:flex; justify-content:space-between; margin-bottom:5px;">' +
                    '<span>每小時產量 (PCS):</span>' +
                    '<strong style="font-size:18px;">' + Math.floor(hourlyOutput).toLocaleString() + '</strong>' +
                '</div>' +
                '<hr style="border-top:1px solid #f5c6cb; margin:10px 0;">' +
                '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                    '<span>每日產量 (PCS):</span>' +
                    '<strong style="font-size:28px;">' + Math.floor(dailyOutput).toLocaleString() + '</strong>' +
                '</div>';
        });
    }
});
