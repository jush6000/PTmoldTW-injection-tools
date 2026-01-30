document.addEventListener("DOMContentLoaded", function() {

    // 輔助函式：檢查必填
    function check(v, msg) { if(!v) { alert(msg); return false; } return true; }

    // ============================================================
    // 工具 1：鎖模力估算器
    // ============================================================
    var cCon = document.getElementById("clamping-calculator-app");
    if (cCon) {
        console.log("載入工具 1...");
        var mats = [{n:"PP / PE",p:300},{n:"ABS / PS",p:350},{n:"PA / POM",p:600},{n:"PC / PMMA",p:700},{n:"PC+GF",p:800}];
        var opt = mats.map(function(m){return '<option value="'+m.p+'">'+m.n+'</option>'}).join('');
        cCon.innerHTML = '<div style="background:#fff;padding:25px;border:1px solid #ddd;border-radius:10px;max-width:500px;margin:0 auto;box-shadow:0 4px 10px rgba(0,0,0,0.05);"><h3 style="margin-top:0;color:#333;text-align:center;border-bottom:2px solid #007bff;padding-bottom:10px;">🛠️ 鎖模力估算器</h3><div style="display:flex;gap:10px;margin:15px 0;"><input type="number" id="c-l" placeholder="長 cm" style="flex:1;padding:10px;border:1px solid #ddd;border-radius:5px;"><input type="number" id="c-w" placeholder="寬 cm" style="flex:1;padding:10px;border:1px solid #ddd;border-radius:5px;"></div><select id="c-m" style="width:100%;padding:10px;margin-bottom:15px;border:1px solid #ddd;border-radius:5px;">'+opt+'</select><input type="number" id="c-s" value="1.2" placeholder="安全係數" style="width:100%;padding:10px;margin-bottom:15px;border:1px solid #ddd;border-radius:5px;"><button id="c-b" style="width:100%;padding:12px;background:#007bff;color:#fff;border:none;border-radius:5px;font-weight:bold;cursor:pointer;">計算</button><div id="c-r" style="margin-top:20px;padding:15px;background:#f8f9fa;display:none;text-align:center;color:#d9534f;font-weight:bold;border-radius:5px;"></div></div>';
        document.getElementById("c-b").addEventListener("click",function(){
            var l=parseFloat(document.getElementById("c-l").value), w=parseFloat(document.getElementById("c-w").value), p=parseFloat(document.getElementById("c-m").value), s=parseFloat(document.getElementById("c-s").value);
            if(check(l&&w,"請輸入長寬")) {
                document.getElementById("c-r").style.display="block";
                document.getElementById("c-r").innerHTML='建議鎖模力：<span style="font-size:24px;">'+((l*w*p/1000)*s).toFixed(1)+'</span> 噸';
            }
        });
    }

    // ============================================================
    // 工具 2：冷卻時間估算器
    // ============================================================
    var coolCon = document.getElementById("cooling-time-app");
    if (coolCon) {
        console.log("載入工具 2...");
        var cMats = [{n:"PP",a:0.096,tm:230,tw:40,te:90},{n:"ABS",a:0.086,tm:230,tw:60,te:95},{n:"PC",a:0.1,tm:300,tw:90,te:135}];
        var cOpt = cMats.map(function(m,i){return '<option value="'+i+'">'+m.n+'</option>'}).join('');
        coolCon.innerHTML = '<div style="background:#fff;padding:25px;border:1px solid #ddd;border-radius:10px;max-width:500px;margin:0 auto;box-shadow:0 4px 10px rgba(0,0,0,0.05);"><h3 style="margin-top:0;color:#28a745;text-align:center;border-bottom:2px solid #28a745;padding-bottom:10px;">⏱️ 冷卻時間估算器</h3><input type="number" id="t-h" placeholder="肉厚 mm" style="width:100%;padding:10px;margin:15px 0;border:1px solid #ddd;border-radius:5px;"><select id="t-m" style="width:100%;padding:10px;margin-bottom:15px;border:1px solid #ddd;border-radius:5px;">'+cOpt+'</select><button id="t-b" style="width:100%;padding:12px;background:#28a745;color:#fff;border:none;border-radius:5px;font-weight:bold;cursor:pointer;">計算</button><div id="t-r" style="margin-top:20px;padding:15px;background:#e8f5e9;display:none;text-align:center;color:#2e7d32;font-weight:bold;border-radius:5px;"></div></div>';
        document.getElementById("t-b").addEventListener("click",function(){
            var h=parseFloat(document.getElementById("t-h").value), m=cMats[document.getElementById("t-m").value];
            if(check(h,"請輸入肉厚")) {
                var t=(h*h/(Math.PI*Math.PI*m.a))*Math.log((4/Math.PI)*(m.tm-m.tw)/(m.te-m.tw));
                document.getElementById("t-r").style.display="block";
                document.getElementById("t-r").innerHTML='理論時間：<span style="font-size:24px;">'+t.toFixed(1)+'</span> 秒';
            }
        });
    }

    // ============================================================
    // 工具 3：單位換算器
    // ============================================================
    var uCon = document.getElementById("unit-converter-app");
    if (uCon) {
        console.log("載入工具 3...");
        uCon.innerHTML = '<div style="background:#fff;padding:25px;border:1px solid #ddd;border-radius:10px;max-width:500px;margin:0 auto;box-shadow:0 4px 10px rgba(0,0,0,0.05);"><h3 style="margin-top:0;color:#6f42c1;text-align:center;border-bottom:2px solid #6f42c1;padding-bottom:10px;">🔄 單位換算器</h3><div style="margin-bottom:15px;background:#f8f9fa;padding:10px;border-radius:5px;"><label>壓力 (MPa ⇄ kg)</label><div style="display:flex;gap:5px;"><input id="u-mpa" placeholder="MPa" style="width:50%"><input id="u-kg" placeholder="kg/cm²" style="width:50%"></div></div><div style="margin-bottom:15px;background:#f8f9fa;padding:10px;border-radius:5px;"><label>長度 (mm ⇄ inch)</label><div style="display:flex;gap:5px;"><input id="u-mm" placeholder="mm" style="width:50%"><input id="u-inch" placeholder="inch" style="width:50%"></div></div><div style="background:#f8f9fa;padding:10px;border-radius:5px;"><label>鎖模力 (Ton ⇄ kN)</label><div style="display:flex;gap:5px;"><input id="u-ton" placeholder="Ton" style="width:50%"><input id="u-kn" placeholder="kN" style="width:50%"></div></div></div>';
        var mp=document.getElementById("u-mpa"),kg=document.getElementById("u-kg"); mp.addEventListener("input",function(){kg.value=(this.value*10.197).toFixed(1)}); kg.addEventListener("input",function(){mp.value=(this.value/10.197).toFixed(1)});
        var mm=document.getElementById("u-mm"),inc=document.getElementById("u-inch"); mm.addEventListener("input",function(){inc.value=(this.value/25.4).toFixed(3)}); inc.addEventListener("input",function(){mm.value=(this.value*25.4).toFixed(2)});
        var tn=document.getElementById("u-ton"),kn=document.getElementById("u-kn"); tn.addEventListener("input",function(){kn.value=(this.value*9.807).toFixed(1)}); kn.addEventListener("input",function(){tn.value=(this.value/9.807).toFixed(1)});
    }

    // ============================================================
    // 工具 4：產能試算機
    // ============================================================
    var pCon = document.getElementById("production-capacity-app");
    if (pCon) {
        console.log("載入工具 4...");
        pCon.innerHTML = '<div style="background:#fff;padding:25px;border:1px solid #ddd;border-radius:10px;max-width:500px;margin:0 auto;box-shadow:0 4px 10px rgba(0,0,0,0.05);"><h3 style="margin-top:0;color:#dc3545;text-align:center;border-bottom:2px solid #dc3545;padding-bottom:10px;">🏭 產能試算機</h3><div style="display:flex;gap:10px;margin:15px 0;"><input id="p-c" type="number" placeholder="週期 (秒)" style="flex:1;padding:10px;border:1px solid #ddd;border-radius:5px;"><input id="p-n" type="number" placeholder="穴數" style="flex:1;padding:10px;border:1px solid #ddd;border-radius:5px;"></div><div style="display:flex;gap:10px;margin-bottom:15px;"><select id="p-h" style="flex:1;padding:10px;border:1px solid #ddd;border-radius:5px;"><option value="8">8H</option><option value="12">12H</option><option value="24">24H</option><option value="custom">自訂...</option></select><input type="number" id="p-h-custom" style="flex:1;padding:10px;border:1px solid #ddd;border-radius:5px;display:none;" placeholder="輸入時數"></div><div style="margin-bottom:20px;"><label>稼動率 %</label><input type="number" id="p-e" value="90" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:5px;"></div><button id="p-b" style="width:100%;padding:12px;background:#dc3545;color:#fff;border:none;border-radius:5px;font-weight:bold;cursor:pointer;">計算</button><div id="p-r" style="margin-top:20px;padding:15px;background:#f8d7da;display:none;border-radius:5px;color:#721c24;"></div></div>';
        
        document.getElementById("p-h").addEventListener("change", function() {
            document.getElementById("p-h-custom").style.display = (this.value === "custom") ? "block" : "none";
        });

        document.getElementById("p-b").addEventListener("click",function(){
            var c=parseFloat(document.getElementById("p-c").value), n=parseFloat(document.getElementById("p-n").value), e=parseFloat(document.getElementById("p-e").value)/100;
            var hVal = document.getElementById("p-h").value;
            var h = (hVal === "custom") ? parseFloat(document.getElementById("p-h-custom").value) : parseFloat(hVal);
            
            if(check(c&&n&&h,"請輸入完整數據")){
                var hourly = (3600/c)*n*e;
                var daily = hourly*h;
                document.getElementById("p-r").style.display="block";
                document.getElementById("p-r").innerHTML='每小時：'+Math.floor(hourly).toLocaleString()+'<br>日產量：<strong style="font-size:24px;">'+Math.floor(daily).toLocaleString()+'</strong> PCS';
            }
        });
    }

    // ============================================================
    // 工具 5：成型計量計算機 (Shot Size Calculator)
    // ============================================================
    var meteringContainer = document.getElementById("material-metering-app");
    if (meteringContainer) {
        console.log("載入工具 5...");

        var matData = {
            "ABS": 1.05, "ABS防火": 1.17, "ABS+30%GF": 1.28, "AS": 1.06,
            "HDPE": 0.96, "LDPE": 0.92, "PA6": 1.13, "PA6+15%GF": 1.23,
            "PA6+30%GF": 1.35, "PA6+50%GF": 1.56, "PA66": 1.13, "PA66+15%GF": 1.23,
            "PA66+30%GF": 1.39, "PBT": 1.31, "PBT+15%GF": 1.45, "PBT+30%GF (1)": 1.52,
            "PBT+30%GF (2)": 1.60, "PC": 1.20, "PC/ABS": 1.13, "PC+10%GF": 1.27,
            "PMMA": 1.19, "POM": 1.41, "POM+25%GF": 1.59, "PP": 0.90,
            "PP+10%GF": 0.99, "PP+30%GF": 1.12, "PP+30%MF": 1.13, "PP+40%MF": 1.23,
            "PPO": 1.10, "PPS+30%GF": 1.52, "PPS+40%GF": 1.66, "PS": 1.10
        };

        var matOptions = '<option value="" disabled selected>請選擇材質</option>';
        for (var key in matData) {
            matOptions += '<option value="' + matData[key] + '">' + key + '</option>';
        }

        meteringContainer.innerHTML = 
            '<div style="background:#fff; padding:25px; border:1px solid #ddd; border-radius:10px; max-width:500px; margin:0 auto; box-shadow:0 4px 10px rgba(0,0,0,0.05);">' +
                '<h3 style="margin-top:0; color:#0d6efd; text-align:center; border-bottom:2px solid #0d6efd; padding-bottom:10px; margin-bottom:20px;">📏 成型計量計算機</h3>' +
                '<div style="background:#f8f9fa; padding:15px; border-radius:5px; margin-bottom:15px;">' +
                    '<label style="font-weight:bold; display:block; margin-bottom:5px;">1. 機台與材質</label>' +
                    '<div style="display:flex; gap:10px; margin-bottom:10px;">' +
                        '<div style="flex:1;"><input type="number" id="m-screw" placeholder="螺桿直徑 mm" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;"></div>' +
                        '<div style="flex:1;"><select id="m-mat" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">' + matOptions + '</select></div>' +
                    '</div>' +
                    '<input type="number" id="m-density" placeholder="比重 (自動帶入)" step="0.01" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; background:#e9ecef;">' +
                '</div>' +
                '<div style="background:#f8f9fa; padding:15px; border-radius:5px; margin-bottom:15px;">' +
                    '<label style="font-weight:bold; display:block; margin-bottom:5px;">2. 產品數據</label>' +
                    '<div style="display:flex; gap:10px; margin-bottom:10px;">' +
                        '<div style="flex:1;"><input type="number" id="m-weight" placeholder="成品重 (g)" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;"></div>' +
                        '<div style="flex:1;"><input type="number" id="m-cav" placeholder="穴數" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;"></div>' +
                    '</div>' +
                    '<div style="display:flex; gap:10px;">' +
                        '<div style="flex:1;"><input type="number" id="m-runner" placeholder="流道重 (g)" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;"></div>' +
                        '<div style="flex:1;"><input type="number" id="m-cushion" placeholder="預留 (mm)" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;"></div>' +
                    '</div>' +
                '</div>' +
                '<button id="m-btn" style="width:100%; background:#0d6efd; color:#fff; padding:12px; border:none; border-radius:5px; cursor:pointer; font-weight:bold; font-size:16px;">計算行程</button>' +
                '<div id="m-res" style="margin-top:20px; padding:15px; background:#e7f1ff; color:#084298; border-radius:5px; display:none; border:1px solid #b6d4fe;"></div>' +
            '</div>';

        document.getElementById("m-mat").addEventListener("change", function() { document.getElementById("m-density").value = this.value; });
        document.getElementById("m-btn").addEventListener("click", function() {
            var screw = parseFloat(document.getElementById("m-screw").value), den = parseFloat(document.getElementById("m-density").value), weight = parseFloat(document.getElementById("m-weight").value), cav = parseFloat(document.getElementById("m-cav").value);
            var runner = parseFloat(document.getElementById("m-runner").value) || 0;
            var cushion = parseFloat(document.getElementById("m-cushion").value) || 5;

            if (check(screw&&den&&weight&&cav,"請輸入完整數據")) {
                var r = (screw/2)/10;
                var volPerMM = Math.PI*r*r*0.1;
                var totalWeight = (weight*cav)+runner;
                var totalStroke = (totalWeight/den)/volPerMM;
                var storagePos = totalStroke+cushion;
                var firstStage = storagePos - ((runner/den)/volPerMM);
                var finalStage = (totalStroke*0.05)+cushion;

                document.getElementById("m-res").style.display = "block";
                document.getElementById("m-res").innerHTML = 
                    '<div style="text-align:center; margin-bottom:10px; font-weight:bold;">總射出重量：' + totalWeight.toFixed(2) + ' g</div>' +
                    '<hr style="border-top:1px solid #b6d4fe; margin:10px 0;">' +
                    '<div style="display:flex; justify-content:space-between;"><span>建議儲料位置:</span><strong>' + storagePos.toFixed(1) + ' mm</strong></div>' +
                    '<div style="display:flex; justify-content:space-between; color:#666; font-size:14px;"><span>(扣除流道後):</span><span>' + firstStage.toFixed(1) + ' mm</span></div>' +
                    '<div style="display:flex; justify-content:space-between; margin-top:5px;"><span>殘量監控點:</span><strong>' + finalStage.toFixed(1) + ' mm</strong></div>';
            }
        });
    }

    // ============================================================
    // 工具 6：滯留時間計算機 (Residence Time)
    // ============================================================
    var resCon = document.getElementById("residence-time-app");
    if (resCon) {
        console.log("載入工具 6...");
        var rMats = {"PP":0.9,"ABS":1.05,"PC":1.2,"PA66":1.13,"POM":1.41,"PBT":1.31,"PMMA":1.19};
        var rOpt = '<option value="" disabled selected>選擇材質</option>'; for(var k in rMats) rOpt+='<option value="'+rMats[k]+'">'+k+'</option>';

        resCon.innerHTML = 
            '<div style="background:#fff; padding:25px; border:1px solid #ddd; border-radius:10px; max-width:500px; margin:0 auto; box-shadow:0 4px 10px rgba(0,0,0,0.05);">' +
                '<h3 style="margin-top:0; color:#fd7e14; text-align:center; border-bottom:2px solid #fd7e14; padding-bottom:10px; margin-bottom:20px;">🔥 滯留時間計算機</h3>' +
                '<div style="margin-bottom:15px;">' +
                    '<label style="font-weight:bold; display:block; margin-bottom:5px;">1. 機台規格</label>' +
                    '<input type="number" id="r-cap" placeholder="機台最大射出量 (PS克數)" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:5px;">' +
                    '<div style="font-size:12px; color:#888;">*請查閱機台銘牌 (Max Shot Weight)</div>' +
                '</div>' +
                '<div style="margin-bottom:15px;">' +
                    '<label style="font-weight:bold; display:block; margin-bottom:5px;">2. 生產數據</label>' +
                    '<div style="display:flex; gap:10px;">' +
                        '<input type="number" id="r-shot" placeholder="總射出重 (g)" style="flex:1; padding:10px; border:1px solid #ccc; border-radius:5px;">' +
                        '<input type="number" id="r-cyc" placeholder="週期 (秒)" style="flex:1; padding:10px; border:1px solid #ccc; border-radius:5px;">' +
                    '</div>' +
                '</div>' +
                '<div style="margin-bottom:20px;">' +
                    '<label style="font-weight:bold; display:block; margin-bottom:5px;">3. 使用材質</label>' +
                    '<select id="r-mat" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:5px;">' + rOpt + '</select>' +
                '</div>' +
                '<button id="r-btn" style="width:100%; background:#fd7e14; color:#fff; padding:12px; border:none; border-radius:5px; cursor:pointer; font-weight:bold; font-size:16px;">計算時間</button>' +
                '<div id="r-res" style="margin-top:20px; padding:15px; background:#fff3cd; color:#856404; border-radius:5px; display:none; border:1px solid #ffeeba;"></div>' +
            '</div>';

        document.getElementById("r-btn").addEventListener("click", function() {
            var cap = parseFloat(document.getElementById("r-cap").value), shot = parseFloat(document.getElementById("r-shot").value), cyc = parseFloat(document.getElementById("r-cyc").value), den = parseFloat(document.getElementById("r-mat").value);
            if (check(cap&&shot&&cyc&&den,"請輸入完整數據")) {
                var realCap = cap * (den / 1.05);
                var resTimeMin = (realCap / shot * cyc) / 60;
                var status = (resTimeMin < 2) ? "<br><span style='color:red;'>⚠️ 時間太短：可能塑化不均</span>" : (resTimeMin > 10) ? "<br><span style='color:red;'>⚠️ 時間太長：原料可能裂解</span>" : "<br><span style='color:green;'>✅ 時間適中 (一般建議 2~5 分)</span>";
                
                document.getElementById("r-res").style.display = "block";
                document.getElementById("r-res").innerHTML = 
                    '<div style="display:flex; justify-content:space-between;"><span>料管庫存量:</span><strong>' + realCap.toFixed(1) + ' g</strong></div>' +
                    '<hr style="border-top:1px solid #ffeeba; margin:10px 0;">' +
                    '<div style="text-align:center;">' +
                        '<span style="font-size:14px; color:#666;">預估滯留時間</span><br>' +
                        '<strong style="font-size:32px;">' + resTimeMin.toFixed(1) + '</strong> <span style="font-size:18px;">分 (min)</span>' + status +
                    '</div>';
            }
        });
    }
    // ============================================================
    // 工具 7：水路雷諾數計算機 (Cooling Efficiency)
    // ID: reynolds-number-app
    // ============================================================
    var reyCon = document.getElementById("reynolds-number-app");
    if (reyCon) {
        console.log("載入工具 7：雷諾數計算機...");

        reyCon.innerHTML = 
            '<div style="background:#fff; padding:25px; border:1px solid #ddd; border-radius:10px; max-width:500px; margin:0 auto; box-shadow:0 4px 10px rgba(0,0,0,0.05);">' +
                '<h3 style="margin-top:0; color:#00b8d4; text-align:center; border-bottom:2px solid #00b8d4; padding-bottom:10px; margin-bottom:20px;">🌊 水路雷諾數計算機</h3>' +
                
                '<div style="margin-bottom:15px; background:#e0f7fa; padding:15px; border-radius:5px;">' +
                    '<label style="font-weight:bold; display:block; margin-bottom:5px;">1. 水路規格</label>' +
                    // 修改重點：外層 div 加入 width:100%
                    '<div style="display:flex; gap:10px; margin-bottom:10px; width:100%; box-sizing:border-box;">' +
                        // 修改重點：加入 box-sizing:border-box
                        '<input type="number" id="rn-dia" placeholder="水管孔徑 (mm)" style="flex:1; min-width:0; padding:10px; border:1px solid #ccc; border-radius:5px; box-sizing:border-box;">' +
                        '<input type="number" id="rn-flow" placeholder="流量 (L/min)" style="flex:1; min-width:0; padding:10px; border:1px solid #ccc; border-radius:5px; box-sizing:border-box;">' +
                    '</div>' +
                    '<input type="number" id="rn-temp" value="40" placeholder="水溫 (°C)" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:5px; box-sizing:border-box;">' +
                    '<div style="font-size:12px; color:#666; margin-top:5px;">*水溫會影響黏度，一般模溫機約 40-60°C</div>' +
                '</div>' +

                '<button id="rn-btn" style="width:100%; background:#00b8d4; color:#fff; padding:12px; border:none; border-radius:5px; cursor:pointer; font-weight:bold; font-size:16px;">計算冷卻效率</button>' +

                '<div id="rn-res" style="margin-top:20px; padding:15px; background:#e0f2f1; color:#00695c; border-radius:5px; display:none; border:1px solid #b2dfdb;"></div>' +
            '</div>';

        document.getElementById("rn-btn").addEventListener("click", function() {
            var d_mm = parseFloat(document.getElementById("rn-dia").value);
            var q_lmin = parseFloat(document.getElementById("rn-flow").value);
            var temp = parseFloat(document.getElementById("rn-temp").value);

            if (check(d_mm && q_lmin && temp, "請輸入完整數據")) {
                var viscosity = 1.78 / (1 + 0.0337 * temp + 0.000221 * temp * temp); 
                var area_mm2 = Math.PI * Math.pow((d_mm / 2), 2);
                var q_mm3s = (q_lmin * 1000 * 1000) / 60; 
                var velocity_mm_s = q_mm3s / area_mm2;
                var velocity_m_s = velocity_mm_s / 1000;
                var re = (velocity_mm_s * d_mm) / viscosity;
                
                var state = "";
                var color = "";
                if (re < 2300) { state = "層流 (Laminar) - ❌ 冷卻差"; color = "#d32f2f"; } 
                else if (re < 4000) { state = "過渡流 (Transition) - ⚠️ 普通"; color = "#fbc02d"; } 
                else { state = "紊流 (Turbulent) - ✅ 效率最佳"; color = "#388e3c"; }

                document.getElementById("rn-res").style.display = "block";
                document.getElementById("rn-res").innerHTML = 
                    '<div style="text-align:center;">' +
                        '<div style="font-size:14px; color:#555;">流速: ' + velocity_m_s.toFixed(2) + ' m/s</div>' +
                        '<hr style="border-top:1px solid #b2dfdb; margin:10px 0;">' +
                        '<span style="font-size:14px; color:#666;">雷諾數 (Re)</span><br>' +
                        '<strong style="font-size:32px; color:' + color + ';">' + Math.floor(re).toLocaleString() + '</strong>' +
                        '<div style="font-size:18px; font-weight:bold; color:' + color + '; margin-top:5px;">' + state + '</div>' +
                    '</div>';
            }
        });
    }
    // ============================================================
    // 工具 8：充填時間與速度計算機 (Filling Speed)
    // ID: filling-speed-app
    // ============================================================
    var fillCon = document.getElementById("filling-speed-app");
    if (fillCon) {
        fillCon.innerHTML = 
            '<div style="background:#fff; padding:25px; border:1px solid #ddd; border-radius:10px; max-width:500px; margin:0 auto; box-shadow:0 4px 10px rgba(0,0,0,0.05);">' +
                '<h3 style="margin-top:0; color:#6610f2; text-align:center; border-bottom:2px solid #6610f2; padding-bottom:10px; margin-bottom:20px;">🚀 充填速度計算機</h3>' +
                '<div style="margin-bottom:15px; background:#f3e5f5; padding:15px; border-radius:5px;">' +
                    '<label style="font-weight:bold; display:block; margin-bottom:5px;">1. 螺桿與行程</label>' +
                    '<div style="display:flex; gap:10px; margin-bottom:10px; width:100%; box-sizing:border-box;">' +
                        '<input type="number" id="fs-screw" placeholder="螺桿直徑 (mm)" style="flex:1; min-width:0; padding:10px; border:1px solid #ccc; border-radius:5px; box-sizing:border-box;">' +
                        '<input type="number" id="fs-stroke" placeholder="射出行程 (mm)" style="flex:1; min-width:0; padding:10px; border:1px solid #ccc; border-radius:5px; box-sizing:border-box;">' +
                    '</div>' +
                    '<div style="font-size:12px; color:#666;">*行程請參考「計量計算機」算出的數值</div>' +
                '</div>' +
                '<div style="margin-bottom:15px; background:#f3e5f5; padding:15px; border-radius:5px;">' +
                    '<label style="font-weight:bold; display:block; margin-bottom:5px;">2. 設定目標</label>' +
                    '<input type="number" id="fs-time" placeholder="期望充填時間 (秒)" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:5px;">' +
                    '<div style="font-size:12px; color:#666; margin-top:5px;">*薄壁產品約 0.5~1秒，一般件約 1.5~3秒</div>' +
                '</div>' +
                '<button id="fs-btn" style="width:100%; background:#6610f2; color:#fff; padding:12px; border:none; border-radius:5px; cursor:pointer; font-weight:bold; font-size:16px;">計算速度</button>' +
                '<div id="fs-res" style="margin-top:20px; padding:15px; background:#ede7f6; color:#4a148c; border-radius:5px; display:none; border:1px solid #d1c4e9;"></div>' +
            '</div>';

        document.getElementById("fs-btn").addEventListener("click", function() {
            var screw = parseFloat(document.getElementById("fs-screw").value);
            var stroke = parseFloat(document.getElementById("fs-stroke").value);
            var time = parseFloat(document.getElementById("fs-time").value);

            if (check(screw && stroke && time, "請輸入完整數據")) {
                // 1. 射出速度 (直線速度) mm/s
                var speed_mm_s = stroke / time;

                // 2. 射出率 (體積流率) cm3/s
                // Area (cm2) = PI * (screw/2/10)^2
                // Vol (cm3) = Area * (stroke/10)
                // Rate = Vol / time
                var r_cm = (screw / 2) / 10;
                var area_cm2 = Math.PI * r_cm * r_cm;
                var vol_cm3 = area_cm2 * (stroke / 10);
                var flow_rate = vol_cm3 / time;

                document.getElementById("fs-res").style.display = "block";
                document.getElementById("fs-res").innerHTML = 
                    '<div style="text-align:center;">' +
                        '<span style="font-size:14px; color:#666;">建議射出速度 (Speed)</span><br>' +
                        '<strong style="font-size:32px;">' + speed_mm_s.toFixed(1) + '</strong> <span style="font-size:18px;">mm/s</span>' +
                        '<hr style="border-top:1px solid #d1c4e9; margin:10px 0;">' +
                        '<span style="font-size:14px; color:#666;">體積流率 (Flow Rate)</span><br>' +
                        '<strong style="font-size:24px;">' + flow_rate.toFixed(1) + '</strong> <span style="font-size:16px;">cm³/s</span>' +
                    '</div>';
            }
        });
    }
});
