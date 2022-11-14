//  get prarameter from url
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setBasicInfo(basicInfo) {
    $("[name='user_name']").val(basicInfo.user_name);


}

function toGenderText(strInput) {
    if (strInput === "1") {
        return "男";
    } else if (strInput === "2") {
        return "女";
    }
    return "";
}

/*
{
    "created_at": "2022-11-11T11:06:58.303867",
    "updated_at": "2022-11-11T11:09:52.373971",
    "id": 6,
    "uuid": "test_uuid",
    "patient_basic_info_id": 1,
    "pain_assessment_info_id": 1,
    "prev_medication_info_id": 1,
    "decision_info_id": 2,
    "doctor_id": 0,
    "previous_medication_issue": "p1",
    "recmd": "s1#6",
    "patient_basic_info": {
        "created_at": "2022-11-11T11:06:35.244717",
        "updated_at": null,
        "id": 1,
        "user_name": "test70",
        "uid": "123123",
        "gender": "1",
        "age": 22,
        "height": null,
        "weight": null,
        "job": null,
        "edu": null,
        "special": "无",
        "tel": null,
        "tumor": "无",
        "tumor_metastasis": null,
        "tumor_treatment": null,
        "illness": null,
        "liver_function": null,
        "kidney_function": null,
        "cardiac_function": null,
        "allergy": null,
        "physical_q1": null,
        "physical_q2": null,
        "physical_q3": null,
        "physical_q4": null,
        "physical_q5": null,
        "physical_score": null
    },
    "pain_assessment_info": {
        "id": 1,
        "diagnostic_uuid": "test_uuid",
        "causes": "1",
        "body_parts": "0",
        "character": "1",
        "level": 0,
        "aggravating_factors": "1",
        "relief_factors": "0",
        "breakout_type": "1",
        "breakout_freq": "0"
    },
    "prev_medication_info": {
        "id": 1,
        "uuid": "cf51ad1f-831b-4704-963d-7556c23d82a3",
        "diagnostic_uuid": "test_uuid",
        "forget": "1",
        "carelessly": "2",
        "withdrawal": "1",
        "bad_withdrawal": "2",
        "adverse_reaction": "1,2",
        "adverse_reaction_drugs": "通便灵胶囊",
        "drug_table_id": null,
        "drug_table": [
            {
                "drug_name": "盐酸阿米替林片",
                "spec": "25mg",
                "dose": 10,
                "dose_unit": "mg",
                "freq": "1",
                "freq_unit": "2",
                "duration": "2"
            },
            {
                "drug_name": "盐酸曲马多缓释片",
                "spec": "100mg",
                "dose": 10,
                "dose_unit": "mg",
                "freq": "1",
                "freq_unit": "2",
                "duration": "1"
            }
        ]
    },
    "decision_info": {
        "id": 2,
        "uuid": "6c044ad8-ca81-4fe3-a2c0-253730d08697",
        "diagnostic_uuid": "test_uuid",
        "drug_table_id": null,
        "previous_medication_issue": "p1",
        "recmd": "s1#6",
        "recmd_constraint": false,
        "pcne_constraint": false,
        "drug_table": [
            {
                "drug_name": "盐酸阿米替林片",
                "spec": "25mg",
                "dose": 10,
                "dose_unit": "mg",
                "freq": "1",
                "freq_unit": "2",
                "duration": "2"
            },
            {
                "drug_name": "盐酸曲马多缓释片",
                "spec": "100mg",
                "dose": 10,
                "dose_unit": "mg",
                "freq": "1",
                "freq_unit": "2",
                "duration": "1"
            }
        ]
    }
}
*/

function genDurationText(strInput) {
    if (strInput === "1") {
        return ">7天";
    } else if (strInput === "2") {
        return "≤7天";
    }
    return "";
}

function genFreqText(freq, freqUnit) {
    if (freqUnit === "1") {
        return `一天${freq}次`;
    } else if (freqUnit === "2") {
        return `每${freq}小时/次`;
    } else if (freqUnit === "3") {
        return `${freq}天/贴`;
    } else if (freqUnit === "4") {
        return "prn（必要时）";
    } else if (freqUnit === "5") {
        return "每晚";
    }
    return "";
}

function genTabledata(drugTable) {
    data = [];
    for (const durg of drugTable) {
        data.push({
            "name": durg.drug_name + durg.spec,
            "dose": durg.dose + durg.dose_unit,
            "freq": genFreqText(durg.freq, durg.freq_unit),
            "duration": genDurationText(durg.duration)
        });
    }
    return data;
}

function toYesNoText(strInput) {
    if (strInput === "1") {
        return "是";
    } else if (strInput === "2") {
        return "否";
    }
    return "";
}

const adverseReactionDict = {
    "0": "无",
    "1": "便秘",
    "2": "恶心呕吐",
    "3": "谵妄",
    "4": "过度镇静",
    "5": "皮肤瘙痒",
    "6": "呼吸抑制",
    "7": "止汗",
    "8": "利尿",
    "9": "胃痉挛",
    "-1": "其他"
}


function genTextFromDict(strInput, dict) {
    const inputList = strInput.split(",");
    if (inputList.length === 0) {
        return "";
    }
    res = []
    for (const input of inputList) {
        if (input in dict) {
            res.push(dict[input]);
        }
    }
    return res.join("、");
}

const causesDict = {
    "1": "肿瘤",
    "2": "肿瘤治疗",
    "3": "非肿瘤相关性",
    "-1": "未知"
}

const characterDict = {
    "1": "酸痛",
    "2": "刺痛",
    "3": "跳痛",
    "4": "钝痛",
    "5": "绞痛",
    "6": "胀痛",
    "7": "坠痛",
    "8": "钻顶样痛",
    "9": "爆裂样痛",
    "10": "撕裂样痛",
    "11": "牵拉样痛",
    "12": "压榨样痛",
    "13": "放电样痛",
    "15": "烧灼样痛",
    "16": "麻木样痛",
    "17": "刀割样痛",
    "19": "轻触痛",
    "23": "无名痛",
    "24": "隐痛",
    "25": "尖锐痛"
}

const bodyPartsDict = {
    "1": "面部",
    "2": "头后部",
    "3": "右上臂（内侧）",
    "4": "右上臂（外侧）",
    "5": "左上臂（内侧）",
    "6": "左上臂（外侧）",
    "7": "右前臂（内侧）",
    "8": "右前臂（外侧）",
    "9": "左前臂（内侧）",
    "10": "左前臂（外侧）",
    "11": "右手",
    "12": "左手",
    "13": "颈胸部",
    "14": "颈背部",
    "15": "腹部（前）",
    "16": "腹部（后）",
    "17": "腰部（前）",
    "18": "腰部（后）",
    "19": "盆部（右）",
    "20": "腰骶部（右）",
    "21": "臀部（右）",
    "22": "盆部（左）",
    "23": "腰骶部（左）",
    "24": "臀部（左）",
    "25": "大腿（右前）",
    "26": "大腿（右后）",
    "27": "大腿（左前）",
    "28": "大腿（左后）",
    "29": "小腿（右前）",
    "30": "小腿（右后）",
    "31": "小腿（左前）",
    "32": "小腿（左后）",
    "33": "右足",
    "34": "左足"
}

const aggravatingFactorsDict = {
    "1": "行走",
    "2": "活动",
    "3": "体位变化",
    "4": "排便",
    "5": "咳嗽",
    "6": "进食",
    "7": "天气",
    "8": "乏力",
    "9": "精神因素",
    "-1": "无"
}

const relievingFactorsDict = {
    "1": "服用镇痛药",
    "2": "环境安静",
    "3": "光线柔和",
    "4": "温度适宜",
    "5": "心理积极",
    "6": "家人陪伴",
    "-1": "无"
}

const breakoutTypeDict = {
    "1": "与特定活动或事件相关联",
    "2": "发生在按时给予镇痛药物的剂量间隔结束时",
    "3": "控制不佳的持续性疼痛",
    "-1": "无"
}

const breakoutFreqDict = {
    "1": "＜3",
    "2": "≥3",
}

layui.use(["form", "table"], function () {
    var $ = layui.jquery,
        form = layui.form,
        table = layui.table;

    const uuid = getParameterByName("uuid");
    console.log(uuid);

    function setBasicInfo(basicInfo) {
        // user_name uid gender age height weight job edu special tel
        $("[name='user_name']").val(basicInfo.user_name);
        $("[name='uid']").val(basicInfo.uid);
        $("[name='gender']").val(toGenderText(basicInfo.gender));
        $("[name='age']").val(basicInfo.age);
        $("[name='height']").val(basicInfo.height);
        $("[name='weight']").val(basicInfo.weight);
        $("[name='job']").val(basicInfo.job);
        $("[name='edu']").val(basicInfo.edu);
        $("[name='special']").val(basicInfo.special);
        $("[name='tel']").val(basicInfo.tel);
        $("[name='tumor']").val(basicInfo.tumor);
        $("[name='tumor_metastasis']").val(basicInfo.tumor_metastasis);
        $("[name='tumor_treatment']").val(basicInfo.tumor_treatment);
        $("[name='illness']").val(basicInfo.illness);
        $("[name='liver_function']").val(basicInfo.liver_function);
        $("[name='kidney_function']").val(basicInfo.kidney_function);
        $("[name='cardiac_function']").val(basicInfo.cardiac_function);
        $("[name='allergy']").val(basicInfo.allergy);
        $("[name='physical_q1']").val(basicInfo.physical_q1);
        $("[name='physical_q2']").val(basicInfo.physical_q2);
        $("[name='physical_q3']").val(basicInfo.physical_q3);
        $("[name='physical_q4']").val(basicInfo.physical_q4);
        $("[name='physical_q5']").val(basicInfo.physical_q5);
        $("[name='physical_score']").val(basicInfo.physical_score);

    }


    function setPainAssessment(painAssessment) {
        // pain_score pain_location pain_character pain_duration pain_trigger pain_relief pain_effect pain_effect_other
        $("[name='causes']").val(
            genTextFromDict(painAssessment.causes, causesDict));
        $("[name='body_parts']").val(
            genTextFromDict(painAssessment.body_parts, bodyPartsDict));
        $("[name='character']").val(
            genTextFromDict(painAssessment.character, characterDict));
        $("[name='level']").val(painAssessment.level);
        $("[name='aggravating_factors']").val(
            genTextFromDict(painAssessment.aggravating_factors, aggravatingFactorsDict));
        $("[name='relief_factors']").val(
            genTextFromDict(painAssessment.relief_factors, relievingFactorsDict));
        $("[name='breakout_type']").val(
            genTextFromDict(painAssessment.breakout_type, breakoutTypeDict));
        $("[name='breakout_freq']").val(
            genTextFromDict(painAssessment.breakout_freq, breakoutFreqDict));
    }

    function setPrevMedication(prevMedication) {
        const tableData = genTabledata(prevMedication.drug_table);
        table.render({
            elem: "#prev_drug_table",
            cols: [
                [
                    { field: "name", width: 320, title: "用药名称" },
                    { field: "dose", width: 120, title: "单次用药剂量" },
                    { field: "freq", width: 120, title: "用药频次" },
                    { field: "duration", width: 120, title: "用药起止时长" },
                ],
            ],
            data: tableData,
        });
        $("[name='forget']").val(
            toYesNoText(prevMedication.forget));
        $("[name='carelessly']").val(
            toYesNoText(prevMedication.carelessly));
        $("[name='withdrawal']").val(
            toYesNoText(prevMedication.withdrawal));
        $("[name='bad_withdrawal']").val(
            toYesNoText(prevMedication.bad_withdrawal));
        $("[name='adverse_reaction']").val(
            genTextFromDict(prevMedication.adverse_reaction, adverseReactionDict));
        $("[name='adverse_reaction_drugs']").val(
            prevMedication.adverse_reaction_drugs);
    }

    // query get data from uuid
    $.ajax({
        url: `${pds_server}/diagnostics/uuid/${uuid}`,
        type: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            const basicInfo = res.patient_basic_info;
            setBasicInfo(basicInfo);
            const painAssessment = res.pain_assessment_info;
            setPainAssessment(painAssessment);
            const prevMedication = res.prev_medication_info;
            setPrevMedication(prevMedication);

        },
        error: function (err) {
            console.log(err);
        }
    });

    // set all input readonly
    $("div.layuimini-main input").attr("readonly", "readonly");


});