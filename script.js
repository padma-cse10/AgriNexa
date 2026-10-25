let farmers = [
['F001','31-45','Kakaraparru','Crop Farming','Paddy',3.5,7.2,'Water Scarcity','Word of mouth','Yes','Mobile Apps','No','No','No','No','No','No','Yes','Yes'],
['F002','46-60','Kakaraparru','Crop Farming','Banana',4.0,6.1,'High Input Cost','Radio/TV','No','None','No','No','No','No','No','No','No','Yes'],
['F003','31-45','Kakaraparru','Mixed Farming','Brinjal',2.5,3.8,'Pests and Diseases','Mobile apps','Yes','Mobile Apps','No','No','No','No','No','Yes','Yes','Yes'],
['F004','46-60','Kakaraparru','Crop Farming','Paddy',5.0,10.5,'Water Scarcity','Word of mouth','No','None','No','No','No','No','No','No','No','Yes'],
['F005','18-30','Kakaraparru','Mixed Farming','Wheat',2.0,4.5,'Low Market Price','Mobile apps','Yes','Mobile Apps','No','No','No','No','No','No','Yes','Yes'],
['F006','31-45','Kakaraparru','Crop Farming','Paddy',4.5,9.3,'High Input Cost','Government services','Yes','Drip Irrigation','No','No','No','No','No','Yes','Yes','Yes'],
['F007','46-60','Kakaraparru','Crop Farming','Chilli',3.0,4.8,'Pests and Diseases','Word of mouth','No','None','No','No','No','No','No','No','No','Yes'],
['F008','31-45','Kakaraparru','Mixed Farming','Banana',3.0,4.2,'Lack of Irrigation','Mobile apps','Yes','Mobile Apps','No','No','No','No','No','Yes','Yes','Yes'],
['F009','60+','Kakaraparru','Crop Farming','Paddy',2.5,5.0,'Water Scarcity','Radio/TV','No','None','No','No','No','No','No','No','No','No'],
['F010','31-45','Kakaraparru','Crop Farming','Wheat',3.5,7.0,'Low Market Price','Mobile apps','Yes','Mobile Apps','No','No','No','No','No','No','Yes','Yes'],
['F011','46-60','Kakaraparru','Crop Farming','Chamanthi',4.0,8.4,'High Input Cost','Word of mouth','Yes','Organic Farming','No','No','No','No','No','Yes','Yes','Yes'],
['F012','31-45','Kakaraparru','Mixed Farming','Brinjal',2.0,3.1,'Pests and Diseases','Mobile apps','Yes','Mobile Apps','No','No','No','No','No','Yes','Yes','Yes'],
['F013','18-30','Kakaraparru','Crop Farming','Chilli',2.5,4.0,'Lack of Technical Knowledge','Social Media','Yes','Mobile Apps','Yes','Yes','No','No','Yes','No','Yes','Yes'],
['F014','46-60','Kakaraparru','Crop Farming','Paddy',3.0,6.5,'Water Scarcity','Radio/TV','No','None','Yes','No','No','No','No','No','No','Yes'],
['F015','31-45','Kakaraparru','Mixed Farming','Brinjal',2.5,4.4,'Lack of Irrigation','Mobile apps','Yes','Drip Irrigation','Yes','Yes','Yes','Yes','Yes','Yes','Yes','Yes'],
['F016','46-60','Kakaraparru','Crop Farming','Chilli',4.0,6.2,'Pests and Diseases','Government services','Yes','Mobile Apps','Yes','Yes','Yes','Yes','No','Yes','Yes','Yes'],
['F017','31-45','Kakaraparru','Crop Farming','Wheat',3.5,6.8,'Low Market Price','Mobile apps','Yes','Mobile Apps','Yes','Yes','No','Yes','Yes','Yes','Yes','Yes'],
['F018','60+','Kakaraparru','Crop Farming','Banana',2.0,4.2,'Water Scarcity','Word of mouth','No','None','Yes','Yes','No','No','No','No','No','Yes'],
['F019','31-45','Kakaraparru','Mixed Farming','Chamanthi',3.0,6.0,'High Input Cost','Mobile apps','Yes','Drip Irrigation','Yes','Yes','Yes','Yes','Yes','Yes','Yes','Yes'],
['F020','18-30','Kakaraparru','Mixed Farming','Chamanthi',2.5,5.0,'Lack of Technical Knowledge','Social Media','Yes','Mobile Apps','Yes','Yes','No','Yes','No','Yes','Yes','Yes']
].map(r=>({id:r[0],age:r[1],location:r[2],type:r[3],crop:r[4],area:r[5],yield:r[6],challenge:r[7],weather:r[8],aware:r[9],tech:r[10],schemeAware:r[11],pmKisan:r[12],pmfby:r[13],soil:r[14],enam:r[15],drip:r[16],organic:r[17],training:r[18]}));

const defaultCropCatalog={Paddy:'Major Crop',Wheat:'Major Crop',Banana:'Fruit',Brinjal:'Vegetable',Chilli:'Vegetable',Chamanthi:'Flower'};
let cropCatalog={...defaultCropCatalog,...JSON.parse(localStorage.getItem('kakaraparruCropCatalog')||'{}')};
const savedFarmers=JSON.parse(localStorage.getItem('kakaraparruFarmers')||'null');
if(Array.isArray(savedFarmers)&&savedFarmers.length) farmers=savedFarmers;
function saveFarmers(){localStorage.setItem('kakaraparruFarmers',JSON.stringify(farmers));}
function saveCropCatalog(){localStorage.setItem('kakaraparruCropCatalog',JSON.stringify(cropCatalog));}


let charts={};
const countBy=(arr,key)=>arr.reduce((o,x)=>(o[x[key]]=(o[x[key]]||0)+1,o),{});
const sumBy=(arr,key,val)=>arr.reduce((o,x)=>(o[x[key]]=(o[x[key]]||0)+Number(x[val]||0),o),{});
const labels=o=>Object.keys(o), values=o=>Object.values(o);
const palette=['#2e7d32','#66bb6a','#ffa726','#42a5f5','#ab47bc','#ef5350','#26a69a','#8d6e63'];
const tr=k=>window.GT?window.GT.t(k):k;
function makeChart(id,type,data,opts={}){ if(charts[id]) charts[id].destroy(); charts[id]=new Chart(document.getElementById(id),{type,data,options:{responsive:true,maintainAspectRatio:false,...opts}}); }
function init(){
 document.querySelectorAll('.nav-link').forEach(a=>a.onclick=e=>{e.preventDefault();document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));a.classList.add('active');document.querySelectorAll('.page-content').forEach(x=>x.classList.add('d-none'));document.getElementById(a.dataset.page+'Page').classList.remove('d-none');document.getElementById('pageTitle').textContent=a.querySelector('.link-text').textContent;});
 document.getElementById('toggleSidebar').onclick=()=>{document.getElementById('sidebar').classList.toggle('collapsed');document.getElementById('mainContent').classList.toggle('expanded')};
 document.getElementById('mobileMenuBtn').onclick=()=>{document.getElementById('sidebar').classList.add('open');document.getElementById('sidebarBackdrop').classList.add('show')};
 document.getElementById('sidebarBackdrop').onclick=()=>{document.getElementById('sidebar').classList.remove('open');document.getElementById('sidebarBackdrop').classList.remove('show')};
 renderAll();
 document.getElementById('farmerSearch').addEventListener('input',renderFarmers);
 document.getElementById('addFarmerForm').addEventListener('submit',addFarmer);
 document.getElementById('addCropForm').addEventListener('submit',addCrop);
 populateCropSelect();
}
function renderAll(){
 const cropYield=sumBy(farmers,'crop','yield'), cropCount=countBy(farmers,'crop'), challenges=countBy(farmers,'challenge'), ages=countBy(farmers,'age');
 document.getElementById('totalFarmers').textContent=farmers.length;document.getElementById('totalCrops').textContent=Object.keys(cropCount).length;document.getElementById('totalArea').textContent=farmers.reduce((s,x)=>s+x.area,0).toFixed(1);document.getElementById('totalYield').textContent=farmers.reduce((s,x)=>s+x.yield,0).toFixed(1);
 makeChart('barChart','bar',{labels:labels(cropYield).map(tr),datasets:[{label:tr('Yield (tons)'),data:values(cropYield),backgroundColor:palette}]},{scales:{y:{beginAtZero:true}}});
 makeChart('pieChart','doughnut',{labels:labels(cropCount).map(tr),datasets:[{data:values(cropCount),backgroundColor:palette}]},{plugins:{legend:{position:'bottom'}}});
 makeChart('challengeChart','bar',{labels:labels(challenges).map(tr),datasets:[{label:tr('Farmers'),data:values(challenges),backgroundColor:palette[2]}]},{indexAxis:'y',scales:{x:{beginAtZero:true,ticks:{stepSize:1}}}});
 const tech=countBy(farmers,'aware'); makeChart('techChart','doughnut',{labels:labels(tech).map(tr),datasets:[{data:values(tech),backgroundColor:[palette[0],palette[5]]}]},{plugins:{legend:{position:'bottom'}}});
 const schemeAwareness={Aware:farmers.filter(x=>x.schemeAware==='Yes').length,'Not aware':farmers.filter(x=>x.schemeAware==='No').length};
 makeChart('schemeChart','doughnut',{labels:labels(schemeAwareness).map(tr),datasets:[{data:values(schemeAwareness),backgroundColor:[palette[0],palette[5]]}]},{plugins:{legend:{position:'bottom'}}});
 makeChart('ageChart','pie',{labels:labels(ages).map(tr),datasets:[{data:values(ages),backgroundColor:palette}]},{plugins:{legend:{position:'bottom'}}});
 renderInsights(challenges,tech,schemeAwareness);renderFarmers();renderCrops(cropYield);renderSurvey();renderSupport();
}
function renderInsights(challenges,tech,schemeAwareness){
 const top=Object.entries(challenges).sort((a,b)=>b[1]-a[1])[0], aware=tech.Yes||0;
 const training=farmers.filter(x=>x.training==='Yes').length, drip=farmers.filter(x=>x.drip==='Yes').length, organic=farmers.filter(x=>x.organic==='Yes').length;
 const schemeNo=farmers.filter(x=>x.schemeAware==='No').length;
 document.getElementById('insights').innerHTML=`
 <div class="col-md-4 mb-3"><div class="alert alert-warning h-100"><strong>${tr('Main challenge')}</strong><br>${tr(top[0])} (${top[1]} ${tr('farmers')})</div></div>
 <div class="col-md-4 mb-3"><div class="alert alert-danger h-100"><strong>${tr('Government scheme gap')}</strong><br>${schemeNo}/${farmers.length} ${tr('farmers')} (${Math.round(schemeNo/farmers.length*100)}%) ${tr('are not aware')}</div></div>
 <div class="col-md-4 mb-3"><div class="alert alert-success h-100"><strong>${tr('Technology awareness')}</strong><br>${aware}/${farmers.length} ${tr('farmers')} (${Math.round(aware/farmers.length*100)}%)</div></div>
 <div class="col-md-4 mb-3"><div class="alert alert-info h-100"><strong>${tr('Training interest')}</strong><br>${training}/${farmers.length} ${tr('farmers')} (${Math.round(training/farmers.length*100)}%)</div></div>
 <div class="col-md-4 mb-3"><div class="alert alert-light border h-100"><strong>${tr('Drip irrigation')}</strong><br>${drip} ${tr('farmers')} ${tr('report use')}</div></div>
 <div class="col-md-4 mb-3"><div class="alert alert-light border h-100"><strong>${tr('Organic farming')}</strong><br>${organic} ${tr('farmers')} ${tr('report use')}</div></div>`;
}
function renderFarmers(){
 const q=(document.getElementById('farmerSearch')?.value||'').toLowerCase();
 const rows=farmers.filter(x=>[x.id,x.crop,x.challenge,x.type].join(' ').toLowerCase().includes(q));
 const label=document.getElementById('farmerCountLabel'); if(label) label.textContent=farmers.length;
 document.getElementById('farmersTable').innerHTML=rows.map(x=>`<tr><td>${x.id}</td><td>${tr(x.age)}</td><td>${tr(x.type)}</td><td><span class="badge bg-success">${tr(x.crop)}</span></td><td>${x.area.toFixed(1)}</td><td>${x.yield.toFixed(1)}</td><td>${tr(x.challenge)}</td><td>${tr(x.tech)}</td><td><button class="btn btn-sm btn-outline-danger" onclick="removeFarmer('${x.id}')" title="${tr('Remove farmer')}"><i class="fas fa-trash"></i></button></td></tr>`).join('');
}
function removeFarmer(id){
 const farmer=farmers.find(x=>x.id===id); if(!farmer) return;
 if(confirm(`${tr('Remove farmer')} ${id}?`)){ farmers=farmers.filter(x=>x.id!==id); saveFarmers(); renderAll(); }
}

function renderCrops(cy){
 const cropNames=[...new Set([...Object.keys(cy),...Object.keys(cropCatalog)])];
 document.getElementById('cropCards').innerHTML=cropNames.map(c=>{
   const fs=farmers.filter(x=>x.crop===c), y=fs.reduce((s,x)=>s+x.yield,0), a=fs.reduce((s,x)=>s+x.area,0);
   return `<div class="col-md-6 col-xl-4 mb-4"><div class="card shadow-sm h-100 border-0"><div class="card-body"><div class="d-flex justify-content-between align-items-start"><div><i class="fas fa-seedling text-success fa-2x mb-2"></i><h5>${tr(c)}</h5></div><span class="badge bg-light text-success">${tr(cropCatalog[c]||'Crop')}</span></div><p class="mb-1">${tr('Farmers:')} <strong>${fs.length}</strong></p><p class="mb-1">${tr('Area:')} <strong>${a.toFixed(1)} ${tr('ac')}</strong></p><p class="mb-2">${tr('Yield:')} <strong>${y.toFixed(1)} ${tr('tons')}</strong></p><small class="text-muted">${tr(fs.length?'Based on farmer survey records':'No farmer survey record yet')}</small></div></div></div>`;
 }).join('');
 document.getElementById('cropTable').innerHTML=cropNames.map(c=>{const fs=farmers.filter(x=>x.crop===c),a=fs.reduce((s,x)=>s+x.area,0),y=fs.reduce((s,x)=>s+x.yield,0);return `<tr><td><strong>${tr(c)}</strong></td><td>${tr(cropCatalog[c]||'Crop')}</td><td>${fs.length}</td><td>${a.toFixed(1)} ${tr('ac')}</td><td>${y.toFixed(1)} ${tr('tons')}</td><td>${fs.length?(y/fs.length).toFixed(2):'0.00'} ${tr('tons')}</td></tr>`}).join('');
 populateCropSelect();
}
function populateCropSelect(){
 const select=document.getElementById('newFarmerCrop'); if(!select) return;
 const current=select.value; select.innerHTML=Object.keys(cropCatalog).sort().map(c=>`<option value="${c}">${tr(c)}</option>`).join(''); if(current&&cropCatalog[current]) select.value=current;
}
function addFarmer(e){
 e.preventDefault();
 const id=document.getElementById('newFarmerId').value.trim();
 if(farmers.some(x=>x.id.toLowerCase()===id.toLowerCase())){alert(tr('Farmer ID already exists. Please use a new ID.'));return;}
 const crop=document.getElementById('newFarmerCrop').value;
 const obj={id,age:document.getElementById('newFarmerAge').value,location:'Kakaraparru',type:document.getElementById('newFarmerType').value,crop,area:Number(document.getElementById('newFarmerArea').value),yield:Number(document.getElementById('newFarmerYield').value),challenge:document.getElementById('newFarmerChallenge').value,weather:'Not specified',aware:document.getElementById('newAware').value,tech:document.getElementById('newFarmerTech').value,schemeAware:document.getElementById('newSchemeAware').value,pmKisan:'No',pmfby:'No',soil:'No',enam:'No',drip:'No',organic:'No',training:document.getElementById('newTraining').value};
 farmers.push(obj); saveFarmers(); document.getElementById('addFarmerForm').reset(); bootstrap.Modal.getInstance(document.getElementById('addFarmerModal')).hide(); renderAll();
}
function addCrop(e){
 e.preventDefault();
 const name=document.getElementById('newCropName').value.trim(); const category=document.getElementById('newCropCategory').value;
 if(!name)return; const key=name.replace(/\s+/g,' '); if(cropCatalog[key]){alert(tr('This crop already exists.'));return;}
 cropCatalog[key]=category; saveCropCatalog(); document.getElementById('addCropForm').reset(); bootstrap.Modal.getInstance(document.getElementById('addCropModal')).hide(); renderAll();
}

function renderSurvey(){
 const tech=farmers.filter(x=>x.aware==='Yes').length, train=farmers.filter(x=>x.training==='Yes').length,
 schemesYes=farmers.filter(x=>x.schemeAware==='Yes').length, schemesNo=farmers.filter(x=>x.schemeAware==='No').length,
 mobile=farmers.filter(x=>x.tech==='Mobile Apps').length, drip=farmers.filter(x=>x.drip==='Yes').length;
 const cards=[
 ['Modern technology awareness',tech,'Yes responses'],['Interested in training',train,'Yes responses'],['Government scheme awareness',schemesYes,'Aware responses'],['Not aware of government schemes',schemesNo,'No responses'],['Mobile app users/interested',mobile,'Responses'],['Drip irrigation',drip,'Yes responses']
 ];
 document.getElementById('surveyCards').innerHTML=cards.map(x=>`<div class="col-md-4 mb-3"><div class="card shadow-sm h-100"><div class="card-body"><h6>${tr(x[0])}</h6><h2 class="text-success">${x[1]}</h2><small class="text-muted">${x[1]} ${tr(x[2])} ${tr('out of')} ${farmers.length}</small><div class="progress mt-3"><div class="progress-bar bg-success" style="width:${x[1]/farmers.length*100}%"></div></div></div></div></div>`).join('')+
 `<div class="col-12 mt-2"><div class="card shadow-sm border-start border-danger border-4"><div class="card-body"><h5 class="mb-2">${tr('Key Finding: Government Scheme Awareness')}</h5><p class="mb-1"><strong>${schemesNo} ${tr('of')} ${farmers.length} ${tr('farmers')} (${Math.round(schemesNo/farmers.length*100)}%)</strong> ${tr('reported that they are not aware of government agricultural schemes.')}</p><p class="text-muted mb-0">${tr('The project therefore focuses on scheme awareness through the Farmer Support section, awareness activities and official information links.')}</p></div></div></div>`;
}
const governmentSchemes=[
 {icon:'fa-hand-holding-usd',name:'PM-KISAN',desc:'Income support scheme for eligible landholding farmer families. Use the official portal to check eligibility, registration and status.',url:'https://pmkisan.gov.in/'},
 {icon:'fa-shield-alt',name:'PMFBY – Crop Insurance',desc:'Crop insurance support for notified crops and risks. Farmers can use the official portal for registration, policy status and claims information.',url:'https://www.pmfby.gov.in/'},
 {icon:'fa-flask',name:'Soil Health Card',desc:'Helps farmers understand soil nutrient status and use soil-test-based fertilizer recommendations.',url:'https://soilhealth.dac.gov.in/'},
 {icon:'fa-credit-card',name:'Kisan Credit Card (KCC)',desc:'Agricultural credit facility intended to support eligible farmers with timely farm-related credit.',url:'https://pmkisan.gov.in/'},
 {icon:'fa-store',name:'e-NAM',desc:'National Agriculture Market platform that supports transparent online agricultural market linkages.',url:'https://enam.gov.in/web/'},
 {icon:'fa-solar-panel',name:'PM-KUSUM',desc:'Supports solar-energy solutions for the agricultural sector through state-implemented components.',url:'https://pmkusum.mnre.gov.in/'}
];
const farmTechnologies=[
 {icon:'fa-tint',name:'Drip Irrigation',desc:'Delivers water close to plant roots and can help improve water-use efficiency.'},
 {icon:'fa-recycle',name:'Crop Rotation',desc:'Rotating crops can support soil health and reduce repeated crop-specific pressure.'},
 {icon:'fa-water',name:'Hydroponics',desc:'A soil-less growing method that may suit selected crops and controlled environments.'},
 {icon:'fa-layer-group',name:'Vertical Farming',desc:'Uses stacked growing spaces and is mainly useful where land is limited.'},
 {icon:'fa-helicopter',name:'Agricultural Drones',desc:'Can support crop observation and selected spraying or monitoring activities where appropriate.'}
];
function renderSupport(){
 const no=farmers.filter(x=>x.schemeAware==='No').length;
 document.getElementById('schemeGapCount').textContent=`${no} ${tr('of')} ${farmers.length} ${tr('surveyed farmers')}`;
 document.getElementById('schemeGapPercent').textContent=`${Math.round(no/farmers.length*100)}% ${tr('reported no awareness')}`;
 document.getElementById('schemeCards').innerHTML=governmentSchemes.map((x,i)=>`<div class="col-md-6 col-xl-4 mb-4"><div class="card shadow-sm h-100 support-card"><div class="card-body"><div class="support-icon"><i class="fas ${x.icon}"></i></div><h5>${tr(x.name)}</h5><p class="text-muted">${tr(x.desc)}</p><div class="d-flex flex-wrap gap-2"><button type="button" class="btn btn-success btn-sm" onclick="openSupportGuide(${i})"><i class="fas fa-route me-1"></i>${tr('How to Use')}</button><a class="btn btn-outline-success btn-sm" href="${x.url}" target="_blank" rel="noopener">${tr('Official Information')} <i class="fas fa-external-link-alt ms-1"></i></a></div></div></div></div>`).join('');
 document.getElementById('technologyCards').innerHTML=farmTechnologies.map(x=>`<div class="col-md-6 col-xl-4 mb-4"><div class="card shadow-sm h-100 support-card"><div class="card-body"><div class="support-icon"><i class="fas ${x.icon}"></i></div><h5>${tr(x.name)}</h5><p class="text-muted mb-0">${tr(x.desc)}</p></div></div></div>`).join('');
}

function openSupportGuide(index){
 const x=governmentSchemes[index]; if(!x) return;
 // Build the complete modal from translation keys every time it opens.
 // This prevents a previously rendered English modal from surviving a language switch.
 const title=document.getElementById('supportGuideTitle');
 const intro=document.getElementById('supportGuideIntro');
 const list=document.getElementById('supportGuideSteps');
 const closeBtn=document.getElementById('supportGuideClose');
 const officialBtn=document.getElementById('supportGuideOfficial');
 const currentLang=window.GT ? window.GT.get() : 'English';
 const translate=key=>window.GT ? window.GT.t(key) : key;
 if(title) title.innerHTML=`<i class="fas fa-route text-success me-2"></i><span>${translate('How to Use')} ${translate(x.name)}</span>`;
 if(intro) intro.innerHTML=`<i class="fas fa-info-circle me-2"></i>${translate('Follow these steps to use this service.')}`;
 const steps=['Check your eligibility for this scheme.','Read the current requirements on the official portal.','Keep the required identity, land, bank or crop documents ready.','Open the official website from the scheme card.','Apply through the official channel when applications are available.','Save your application or reference number and check status.'];
 if(list) list.innerHTML=steps.map((step,i)=>`<li><span class="visually-hidden">${i+1}. </span>${translate(step)}</li>`).join('');
 if(closeBtn) closeBtn.textContent=translate('Close');
 if(officialBtn){ officialBtn.href=x.url||'#'; const span=officialBtn.querySelector('span'); if(span) span.textContent=translate('Open Official Website'); }
 const modalEl=document.getElementById('supportGuideModal');
 if(modalEl && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalEl).show();
}
document.addEventListener('DOMContentLoaded',init);

document.addEventListener('growingLanguageChanged',()=>{ if(typeof renderAll==='function') renderAll(); });
