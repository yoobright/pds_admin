var $u = utils || require('./utils');

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
    } else if (strInput === "0") {
        return "否";
    }
    return "";
}

function genIssueText(strInput) {
    if (strInput === "") {
        return "无";
    }
    drugIssue = JSON.parse(strInput);
    const previousIssueText = utils.Text.previousIssueText;
    const res = [];
    if (drugIssue.C1_3) {
        res.push(
            `${previousIssueText["C1.3"]}`
        );
    }

    if (drugIssue.C1_4) {
        res.push(
            `${previousIssueText["C1.4"]}`
        );
    }

    if (drugIssue.C1_5) {
        res.push(
            `${previousIssueText["C1.5"]}`
        );
    }

    if (drugIssue.C3_2.length > 0) {
        res.push(
            `${previousIssueText["C3.2"]}`
        );
    }

    if (drugIssue.C3_4.length > 0) {
        res.push(
            `${previousIssueText["C3.4"]}`
        );
    }

    return res.join("、");

}


function genTextFromDict(strInput, dict) {
    if (strInput === null) {
        return "";
    }
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
        $("[name='gender']").val($u.Text.genGenderText(basicInfo.gender));
        $("[name='age']").val(basicInfo.age);
        $("[name='height']").val(basicInfo.height);
        $("[name='weight']").val(basicInfo.weight);
        $("[name='job']").val(basicInfo.job);
        $("[name='edu']").val(
            genTextFromDict(basicInfo.edu, $u.Text.eduDict));
        $("[name='special']").val(
            genTextFromDict(basicInfo.special, $u.Text.specialDict));
        $("[name='tel']").val(basicInfo.tel);
        $("[name='tumor']").val(basicInfo.tumor);
        $("[name='tumor_metastasis']").val(basicInfo.tumor_metastasis);
        $("[name='tumor_treatment']").val(basicInfo.tumor_treatment);
        $("[name='illness']").val(basicInfo.illness);
        $("[name='liver_function']").val(
            genTextFromDict(basicInfo.liver_function, $u.Text.liverFunctionDict));
        $("[name='kidney_function']").val(
            genTextFromDict(basicInfo.kidney_function, $u.Text.kidneyFunctionDict));
        $("[name='cardiac_function']").val(
            genTextFromDict(basicInfo.cardiac_function, $u.Text.cardiacFunctionDict));
        $("[name='allergy']").val(basicInfo.allergy);
        $("[name='physical_q1']").val(basicInfo.physical_q1);
        $("[name='physical_q2']").val(basicInfo.physical_q2);
        $("[name='physical_q3']").val(basicInfo.physical_q3);
        $("[name='physical_q4']").val(basicInfo.physical_q4);
        $("[name='physical_q5']").val(basicInfo.physical_q5);
        $("[name='physical_score']").val(basicInfo.physical_score);

    }


    function setPainAssessment(painAssessment) {
        $("[name='causes']").val(
            genTextFromDict(painAssessment.causes,
                $u.Text.causesDict));
        $("[name='body_parts']").val(
            genTextFromDict(painAssessment.body_parts,
                $u.Text.bodyPartsDict));
        $("[name='pain_extra']").val(painAssessment.pain_extra)
        $("[name='character']").val(
            genTextFromDict(painAssessment.character,
                $u.Text.characterDict));
        $("[name='level']").val(painAssessment.level);
        $("[name='aggravating_factors']").val(
            genTextFromDict(painAssessment.aggravating_factors,
                $u.Text.aggravatingFactorsDict));
        $("[name='relief_factors']").val(
            genTextFromDict(painAssessment.relief_factors,
                $u.Text.relievingFactorsDict));
        $("[name='breakout_type']").val(
            genTextFromDict(painAssessment.breakout_type,
                $u.Text.breakoutTypeDict));
        $("[name='breakout_freq']").val(
            genTextFromDict(painAssessment.breakout_freq,
                $u.Text.breakoutFreqDict));
    }

    function setDecision(decision) {

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
        $("[name='compliance_q1']").val(
            toYesNoText(prevMedication.compliance_q1));
        $("[name='compliance_q2']").val(
            toYesNoText(prevMedication.compliance_q2));
        $("[name='compliance_q3']").val(
            toYesNoText(prevMedication.compliance_q3));
        $("[name='compliance_q4']").val(
            toYesNoText(prevMedication.compliance_q4));
        $("[name='adverse_reaction']").val(
            genTextFromDict(prevMedication.adverse_reaction,
                $u.Text.adverseReactionDict));
        $("[name='adverse_reaction_drugs']").val(
            prevMedication.adverse_reaction_drugs);

        // show info
        $("#prev_medication_info").show();
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
            if (painAssessment) {
                setPainAssessment(painAssessment);
            }
            const prevMedication = res.prev_medication_info;
            if (prevMedication) {
                setPrevMedication(prevMedication);
            }
            const decision = res.decision_info;

            $("[name='previous_medication_issue']").val(
                genIssueText(res.previous_medication_issue));
            $("[name='recmd']").val($u.Text.genDecisionText(res.recmd));
            if (decision) {
                setDecision(decision);
            }

        },
        error: function (err) {
            console.log(err);
        }
    });

    // set all input readonly
    $("div.layuimini-main input").attr("readonly", "readonly");


});