module.exports = {"operations":[{"ns":"person","operation":"list","responseType":"SessionResponse","permission":1},{"ns":"person","operation":"details","responseType":"Response","permission":1},{"ns":"person","operation":"add","responseType":"Response","permission":1},{"ns":"person","operation":"update","responseType":"Response","permission":1},{"ns":"person","operation":"delete","responseType":"UsersResponse","permission":1}],"structs":[{"id":"medician","items":[{"id":"nameasa","type":"name","required":true,"indexed":true},{"id":"specialty","cardinality":"many","type":"enum","typeSpec":"specialty","required":true,"indexed":true},{"id":"category","type":"enum","typeSpec":"category","required":true},{"id":"degree","type":"enum","typeSpec":"degree","indexed":true},{"id":"city","type":"dict","typeSpec":"city","indexed":true},{"id":"c","since":2,"required":true},{"id":"organization","type":"ref","typeSpec":"organization","required":true,"indexed":true},{"id":"unit","type":"ref","typeSpec":"unit","required":true},{"id":"since","type":"timeAgo"}]},{"id":"organization","items":[{"id":"name","type":"name","required":true,"immutable":true},{"id":"type","type":"enum","typeSpec":"org_type","required":true},{"id":"city","type":"dict","typeSpec":"city","indexed":true},{"id":"head_of","type":"ref","typeSpec":"person"}]},{"id":"taxonomy","items":[{"id":"name","type":"name","required":true},{"id":"parent","type":"ref","typeSpec":"unit","required":true},{"id":"weight","type":"ref","typeSpec":"person"}]},{"id":"unit","items":[{"id":"name","type":"name","required":true},{"id":"city","type":"dict","typeSpec":"city","indexed":true},{"id":"organization","type":"ref","typeSpec":"organization","indexed":true}]},{"id":"address","items":[{"id":"city","type":"dict","typeSpec":"city","required":true,"indexed":true},{"id":"street","type":"ref","typeSpec":"unit","required":true,"indexed":true},{"id":"country","type":"dict","typeSpec":"country","required":true,"indexed":true}]},{"id":"patient","items":[{"id":"name","type":"name","required":true,"immutable":true},{"id":"birth_date","type":"dateTime","required":true,"indexed":true},{"id":"gender","type":"enum","typeSpec":"gender","required":true,"indexed":true},{"id":"marital_status","type":"enum","typeSpec":"marital_status","indexed":true},{"id":"emergency_contact","type":"issuesCriticality","indexed":true},{"id":"address","type":"ref","typeSpec":"address","required":true},{"id":"phone","type":"issueType","indexed":true},{"id":"email","type":"issueName","indexed":true},{"id":"employment"},{"id":"payment_type","type":"enum","typeSpec":"payment_type"},{"id":"chronic_conditions","cardinality":"many"},{"id":"risk_factors","cardinality":"many","type":"dict","typeSpec":"risk_factor","indexed":true},{"id":"allergies","cardinality":"many","type":"enum","typeSpec":"allergy"},{"id":"notes","type":"note"}]},{"id":"medication","items":[{"id":"date","type":"date","indexed":true},{"id":"type"},{"id":"payment_type","type":"enum","typeSpec":"payment_type"},{"id":"amount"},{"id":"medication"},{"id":"appearance"},{"id":"quantity","required":true},{"id":"start_date","type":"date"},{"id":"end_date","type":"date"},{"id":"schedule"},{"id":"pharmacy"},{"id":"medician","type":"ref","typeSpec":"medician"}]},{"id":"slot","items":[{"id":"date","type":"date"},{"id":"time","type":"enum","typeSpec":"slot"},{"id":"medician","type":"ref","typeSpec":"medician"},{"id":"status","type":"enum","typeSpec":"slot_status"}]},{"id":"visit","items":[{"id":"city","type":"dict","typeSpec":"city","required":true,"indexed":true},{"id":"organization","type":"ref","typeSpec":"organization","required":true,"indexed":true},{"id":"unit","type":"ref","typeSpec":"unit","required":true,"indexed":true},{"id":"medician","type":"ref","typeSpec":"medician","required":true,"indexed":true},{"id":"person","type":"ref","typeSpec":"person","indexed":true},{"id":"status","type":"enum","typeSpec":"status","required":true,"indexed":true},{"id":"slot","type":"ref","typeSpec":"slot","required":true},{"id":"date","type":"date","required":true,"indexed":true},{"id":"time","type":"time","required":true},{"id":"duration","type":"int","required":true}]},{"id":"dict","items":[{"id":"type","indexed":true},{"id":"scope","indexed":true},{"id":"name"},{"id":"style","indexed":true}]},{"id":"order","items":[{"id":"id","type":"ref"},{"id":"personId"},{"id":"timeslotId","type":"ref","typeSpec":"timetable"},{"id":"startDate","type":"date"},{"id":"endDate","type":"date"},{"id":"physicianId","type":"ref"},{"id":"assignmentId","type":"ref"},{"id":"branchId","type":"ref"},{"id":"notes","type":"longtext"},{"id":"type","type":"enum","typeSpec":"orderType"},{"id":"status","type":"enum","typeSpec":"orderStatus"},{"id":"policyId","since":1100,"type":"ref"},{"id":"providerId","since":1100,"type":"ref"},{"id":"physicianExternalId","since":1100,"type":"externalRef"},{"id":"clinicExternalId","since":1100,"type":"ref"},{"id":"sourceName","since":1100,"type":"name"}]},{"id":"orderRequest","items":[{"id":"timetableId","type":"ref"},{"id":"assignmentId","type":"ref"},{"id":"personId","type":"ref"}]}],"forms":[{"id":"medician","items":[{"group":"main","id":"name","struct":"medician.name","type":"name"},{"group":"main","id":"specialty","struct":"medician.specialization","type":"enum","typeSpec":"specialty"},{"group":"main","id":"category","struct":"medician.category","type":"enum","typeSpec":"category"},{"group":"main","id":"degree","struct":"medician.degree","type":"enum","typeSpec":"degree"},{"group":"main","id":"tags","struct":"medician.tags","type":"tag"},{"group":"main","id":"city","struct":"medician.city","type":"dict","typeSpec":"city"},{"group":"main","id":"organization","struct":"medician.organization","type":"ref","typeSpec":"organization?city={{city}}","shown":"{{city}}"},{"group":"main","id":"unit","struct":"medician.unit","type":"ref","typeSpec":"unit?organization={{organization}}","shown":"{{organization}}"}]},{"id":"organization","items":[{"group":"organization","id":"item","struct":"organization.item","type":"ref","typeSpec":"item"},{"group":"organization","id":"type","struct":"organization.type","type":"enum","typeSpec":"org_type"},{"group":"organization","id":"address","struct":"organization.address","type":"ref","typeSpec":"address"},{"group":"organization","id":"head_of","struct":"organization.head_of","type":"ref","typeSpec":"person"},{"group":"taxonomy","id":"name","struct":"taxonomy.name","type":"name"},{"group":"taxonomy","id":"parent","struct":"taxonomy.parent","type":"ref","typeSpec":"unit"},{"group":"taxonomy","id":"weight","struct":"taxonomy.weight","type":"ref","typeSpec":"person"},{"group":"unit","id":"head_of","struct":"unit.head_of","type":"ref","typeSpec":"person"}]},{"id":"address","items":[{"group":"address","id":"city","struct":"address.city","type":"dict","typeSpec":"city"},{"group":"address","id":"street","struct":"address.street","type":"ref","typeSpec":"unit"},{"group":"address","id":"country","struct":"address.country","type":"dict","typeSpec":"country"},{"group":"address","id":"item","struct":"address.item","type":"embed","typeSpec":"item"}]},{"id":"patient","items":[{"group":"main","id":"name","struct":"person.name","type":"name"},{"group":"main","id":"birth_date","struct":"person.birth_date","type":"dateTime"},{"group":"main","id":"gender","struct":"person.gender","type":"enum","typeSpec":"gender"},{"group":"main","id":"marital_status","struct":"person.marital_status","type":"enum","typeSpec":"marital_status"},{"group":"contacts","id":"emergency_contact","struct":"person.emergency_contact","type":"issuesCriticality"},{"group":"contacts","id":"address","struct":"person.address","type":"ref","typeSpec":"address"},{"group":"contacts","id":"phone","struct":"person.phone","type":"issueType"},{"group":"contacts","id":"email","struct":"person.email","type":"issueName"},{"group":"staff","id":"name","struct":"staff.name","type":"span"},{"group":"staff","id":"position","struct":"staff.position","type":"timeAgo"},{"group":"medication","id":"date","struct":"medication.date"},{"group":"medication","id":"medication","struct":"medication.medication"},{"group":"medication","id":"appearance","struct":"medication.appearance"},{"group":"medication","id":"quantity","struct":"medication.quantity"},{"group":"medication","id":"start_date","struct":"medication.start_date"},{"group":"medication","id":"end_date","struct":"medication.end_date"},{"group":"medication","id":"medician","struct":"medication.medician","type":"ref","typeSpec":"staff"},{"group":"medication","id":"pharmacy","struct":"medication.pharmacy"},{"group":"record","id":"chronic_conditions","struct":"personal_record.chronic_conditions"},{"group":"record","id":"risk_factors","struct":"personal_record.risk_factors","type":"dict","typeSpec":"risk_factor"},{"group":"record","id":"allergies","struct":"personal_record.allergies","type":"enum","typeSpec":"allergy"},{"group":"record","id":"notes","struct":"personal_record.notes","type":"note"}]}],"enums":[{"enum":"gender","values":"male|female|unisex"},{"enum":"marital","values":"married|single"},{"enum":"allergy","values":"penicillin|codeine"},{"enum":"risk_factors","values":"smoking|stress|alcohol|weight"},{"enum":"specialty","values":"therapist|neurologist|ophtalmologist|pulmonologist|cardiologist"},{"enum":"category","values":"first|highest"},{"enum":"degree","values":"doctor|docent|professor"},{"enum":"status","values":"open|appointed|in_progress|done|confirmed"},{"enum":"orderStatus","values":"reserved|cancel|complete"},{"enum":"orderType","values":"online|ofline"}],"types":[{"id":"name","base":"string","ts":1521899170911},{"id":"dict","base":"ref","style":"dict?type=$","ts":1521915408215},{"id":"externalRef","ts":1521915408215},{"id":"date","base":"string","ts":1521915408215},{"ts":1521915408215},{"ts":1521915408215}],"strings":{"read_only":"Read-Only"},"modules":[{"on":true,"id":"dashboard","role":"medician"},{"on":true,"id":"patients","role":"medician"},{"on":true,"id":"calendar","role":"medician"},{"on":true,"id":"my_record","role":"patient"},{"on":true,"id":"visits","role":"patient"},{"on":true,"id":"analytics","role":"admin"},{"on":true,"id":"reports","role":"auditor"}],"roles":[{"id":"doctor","read_record":"all","modify_record":"owner","insert_record":"unit"},{"id":"medician","read_record":"unit","modify_record":"owner","insert_record":"unit"},{"id":"patient","read_record":"person","modify_record":"none","insert_record":"none"},{"id":"admin","read_record":"all","modify_record":"all","insert_record":"none"},{"id":"scientist","read_record":"none","modify_record":"none","insert_record":"none"},{"id":"auditor","read_record":"none","modify_record":"none","insert_record":"none"}],"consts":{"id":"andromeda","description":"Andromeda is an distributed information system to collect and manage medical records.","version":"1.0.0","vendor":"epam","vendorUrl":"https://epam.com","package":"com.epam.andromeda","license":"PROPRIETARY","specUrl":"https://docs.google.com/spreadsheets/d/1wAyxmPVaPCjzaoVEQtLOxNgIgapiigiZUxSFrZEy5i0/edit#gid","docsUrl":"https://docs.google.com/spreadsheets/d/1wAyxmPVaPCjzaoVEQtLOxNgIgapiigiZUxSFrZEy5i0/edit"}}