var utils = utils || {};

utils.Text = class {

    static decsionText = {
        s1: {
            1: "使用非甾体抗炎药或对乙酰氨基酚",
            2: "使用强阿片类药物",
            3: "使用弱阿片类药物",
            4: "使用抗惊厥类药物或抗抑郁类药物",
            5: "使用强阿片类药物+非甾体抗炎药",
            6: "使用强阿片类药物+抗惊厥类药物/抗抑郁类药物",
            7: "使用弱阿片类药物+抗惊厥类药物/抗抑郁类药物",
        },
        s2: {
            1: "停用即释弱阿片",
            2: "停用缓释弱阿片",
            3: "停用即释弱阿片（增加缓释强阿片剂量）",
            4: "停用任一缓释强阿片",
            5: "增加原有即释弱阿片剂量或停用原有即释弱阿片，换用缓释阿片",
            5.1: "停用原有即释弱阿片，换用缓释阿片",
            6: "停用即释弱阿片，增加缓释弱阿片剂量或停用缓释弱阿片，增加即释弱阿片剂量或停用即释弱阿片及缓释弱阿片，换用强阿片",
            6.1: "停用即释弱阿片，增加缓释弱阿片剂量，或停用即释弱阿片及缓释弱阿片，换用缓释强阿片",
            6.2: "停用缓释弱阿片及即释弱阿片，增加强阿片",
            6.3: "停用缓释弱阿片及即释弱阿片，增加缓释强阿片",
            7: "增加原有即释强阿片剂量，或停用即释强阿片，换用缓释强阿片",
            7.1: "停用即释强阿片，换用缓释强阿片",
            7.2: "增加原有即释强阿片剂量，或原有即释强阿片不变，增加缓释强阿片",
            7.3: "原有即释强阿片不变，增加缓释强阿片",
            7.4: "停用任一即释强阿片，换用缓释强阿片或增加另一即释强阿片剂量",
            8: "停用即释强阿片，增加（原有缓释强阿片+即释强阿片）剂量的25%~50%",
            9: "停用缓释弱阿片和即释强阿片，换用缓释强阿片，或停用缓释弱阿片，增加原有即释强阿片剂量",
            9.1: "停用缓释弱阿片和即释强阿片，换用缓释强阿片",
            9.2: "停用缓释弱阿片，增加即释强阿片剂量，或停用缓释弱阿片，增加缓释强阿片",
            9.3: "停用缓释弱阿片，增加缓释强阿片",
            10: "增加原有缓释强阿片剂量的25%~50%",
            11: "增加原有缓释弱阿片剂量或停用缓释弱阿片，增加强阿片",
            11.1: "增加原有缓释弱阿片剂量或停用缓释弱阿片，换用缓释强阿片",
            11.2: "停用缓释弱阿片，增加强阿片",
            11.3: "停用缓释弱阿片，增加缓释强阿片",
            12: "停用即释弱阿片，增加即释强阿片",
            13: "停用即释强阿片，增加（原有缓释强阿片+即释强阿片）剂量的50%~100%",
            14: "增加原有缓释强阿片剂量的同时，增加即释强阿片剂量",
            15: "停用原有即释弱阿片，换用强阿片",
            15.1: "停用原有即释弱阿片，换用缓释强阿片",
            16: "增加原有缓释强阿片剂量的50%~100%",
            17: "增加弱阿片",
            18: "增加强阿片",
        },
    }

    static decsionText2 = {
        1: {
            1: "停用即释弱阿片，继续使用即释强阿片",
            2: "停用缓释弱阿片，继续使用缓释强阿片",
            3: "停用即释弱阿片，继续使用缓释强阿片",
            4: "停用任一缓释强阿片",
            5: "停用即释弱阿片，换用即释强阿片",
            6: "停用缓释弱阿片及即释弱阿片，换用即释强阿片",
            7: "停用缓释弱阿片及即释弱阿片，换用缓释强阿片",
            8: "增加即释强阿片的剂量的50~100%",
            9: "停用即释强阿片，换用缓释强阿片",
            10: "停用即释强阿片，换用缓释强阿片，剂量增加原即释强阿片的50~100%",
            11: "停用即释强阿片，继续使用缓释强阿片，且剂量增加（缓释强阿片+即释强阿片）的25~50%",
            12: "停用缓释弱阿片，增加即释强阿片剂量",
            13: "停用缓释弱阿片和即释强阿片，换用缓释强阿片",
            14: "增加缓释强阿片剂量的25~50%",
            15: "停用缓释弱阿片，换用即释强阿片",
            16: "停用缓释弱阿片，换用缓释强阿片",
            17: "建议使用即释弱阿片",
            18: "继续使用缓释强阿片，爆发痛时使用即释强阿片（剂量为缓释强阿片的10~20%）",
            19: "停用即释弱阿片，换用缓释强阿片",
            20: "增加缓释强阿片的剂量，爆发痛时使用即释强阿片（剂量为缓释强阿片的10~20%）",
            21: "停用即释强阿片，继续使用缓释强阿片，且剂量增加（缓释强阿片+即释强阿片）的50~100%",
            22: "增加缓释强阿片剂量的50~100%",
            23: "建议使用缓释强阿片"
        },
        2: {
            0: "",
            1: "同时使用非甾体抗炎药",
            2: "同时使用抗惊厥/抗抑郁类药物",
            3: "同时使用非甾体抗炎药和抗惊厥/抗抑郁类药物"
        }
    }

    static specialDict = {
        "1": "老年人(65岁及以上)",
        "2": "儿童(14岁及以下)",
        "3": "孕妇",
        "4": "哺乳期妇女",
        "5": "无",
    }

    static eduDict = {
        "1": "小学及以下",
        "2": "初中",
        "3": "高中",
        "4": "专科/高职",
        "5": "本科",
        "6": "硕士",
        "7": "博士",
    }

    static liverFunctionDict = {
        "1": "正常",
        "2": "不全",
        "3": "严重不全",
        "-1": "不详",
    }

    static kidneyFunctionDict = {
        "1": "正常",
        "2": "不全",
        "3": "严重不全",
        "-1": "不详",
    }


    static cardiacFunctionDict = {
        "1": "正常",
        "2": "Ⅰ级",
        "3": "Ⅱ级",
        "4": "Ⅲ级",
        "5": "Ⅳ级",
        "-1": "不详",
    }

    static causesDict = {
        "1": "肿瘤",
        "2": "肿瘤治疗",
        "3": "非肿瘤相关性",
        "-1": "未知"
    }

    static physicalQ1Dict = {
        "1": "我可以四处走动，没有任何困难",
        "2": "我行动有些不方便",
        "3": "我不能下床活动",
    }

    static physicalQ2Dict = {
        "1": "我能自己照顾自己，没有任何困难",
        "2": "我在洗脸、刷牙、洗澡或穿衣方面有些困难",
        "3": "我无法自己洗脸、刷牙、洗澡或穿衣",
    }

    static physicalQ3Dict = {
        "1": "我能进行日常活动，没有任何困难",
        "2": "我在进行日常活动方面有些困难",
        "3": "我无法进行日常活动",
    }

    static physicalQ4Dict = {
        "1": "我没有任何疼痛或不舒服",
        "2": "我觉得中度疼痛或者不舒服",
        "3": "我觉得极度疼痛或不舒服",
    }

    static physicalQ5Dict = {
        "1": "我不觉得焦虑或抑郁",
        "2": "我觉得中度焦虑或抑郁",
        "3": "我觉得极度焦虑或者抑郁",
    }

    static characterDict = {
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

    static bodyPartsDict = {
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

    static aggravatingFactorsDict = {
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

    static relievingFactorsDict = {
        "1": "服用镇痛药",
        "2": "环境安静",
        "3": "光线柔和",
        "4": "温度适宜",
        "5": "心理积极",
        "6": "家人陪伴",
        "-1": "无"
    }

    static breakoutTypeDict = {
        "1": "与特定活动或事件相关联",
        "2": "发生在按时给予镇痛药物的剂量间隔结束时",
        "3": "控制不佳的持续性疼痛",
        "4": "无"
    }

    static breakoutFreqDict = {
        "1": "≥3",
        "2": "<3",
        "3": "无"
    }

    static illnessDict = {
        "1": "心源性哮喘",
        "2": "高血压",
        "3": "糖尿病",
        "4": "心血管事件史",
        "5": "消化道出血",
        "6": "消化道溃疡",
        "-1": "其他"
    }

    static symptomDict = {
        "1": "咳嗽",
        "2": "寒颤",
    }

    static adverseReactionDict = {
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


    static genDecisionText(strData) {
        const data = strData.split('#');
        if (data.length === 2) {
            if (data[0] === "s1" || data[0] === "s2") {
                return this.decsionText[data[0]][data[1]]
            }
        }

        if (data.length === 3) {
            if (data[0] === "s2") {
                return this.decsionText2[1][data[1]] + " " +
                this.decsionText2[2][data[2]]
            }
        }

        return "未知"
    }


    static genGenderText(strData) {
        if (strData === "1") {
            return "男"
        }
        if (strData === "2") {
            return "女"
        }

        return ""
    }

    static previousIssueText = {
        "P1.1": "尽管正确使用药物治疗没有效果",
        "P1.2": "治疗效果不佳",
        "P1.3": "有未治疗的症状或适应症",
        "P2.1": "（可能）发生药物不良事件",
        "P3.1": "不必要的药物治疗",
        "P3.2": "不清楚的问题/投诉，需要进一步澄清（请仅用作转义）",
        "C1.1": "不符合指南/处方的药物",
        "C1.2": "无用药指征",
        "C1.3": "不适当的组合（药物与药物或药物与草药或药物与保健品）",
        "C1.4": "药物重复使用（药理作用相同或活性成分相同）",
        "C1.5": "尽管存在适应症，未给予药物治疗或没有给与完整的药物治疗",
        "c1.6": "为适应症开具的不同药物/活性成分过多",
        "C3.1": "药物剂量过低",
        "C3.2": "药物剂量过高",
        "C3.3": "给药频次不足",
        "C3.4": "给药频次过多",
        "C3.5": "用药时间的指示错误，不清晰或遗漏",
    };

    static drugCategoryText = {
        "A1": "非针剂非甾体",
        "A2": "外用非甾体",
        "A3": "针剂非甾体",
        "A4": "其他非甾体",
        "A5": "非针剂非选择性非甾体",
        "A6": "外用非选择性非甾体",
        "A7": "针剂非选择性非甾体",
        "A8": "非针剂COX2抑制剂",
        "A9": "外用COX2抑制剂",
        "A10": "针剂COX2抑制剂",
        "B1": "抗惊厥类",
        "B2": "三环类抗抑郁药",
        "B3": "选择性5-羟色胺再摄取抑制剂",
        "B4": "单胺氧化酶抑制剂",
        "B5": "双通道抗抑郁药",
        "C": "非针剂缓释强阿片",
        "D": "非针剂缓释弱阿片",
        "E1": "非针剂即释强阿片",
        "E2": "针剂即释强阿片",
        "F1": "非针剂即释弱阿片",
        "F2": "针剂即释弱阿片",
        "G1": "非针剂纯激动剂",
        "G2": "针剂纯激动剂",
        "H1": "非针剂混合激动剂-拮抗剂",
        "H2": "针剂混合激动剂-拮抗剂",
        "I1": "非针剂混合机制药物",
        "I2": "针剂混合机制药物",
        "J": "非针剂曲马多类药物",
        "K": "4苯二氮卓类（口服类）",
        "L1": "便秘用药",
        "L2": "恶心呕吐用药",
        "L3": "谵妄用药",
        "L4": "镇静用药",
        "L5": "皮肤瘙痒用药",
        "L6": "呼吸抑制用药",
        "L7": "止汗用药",
        "L8": "利尿用药",
        "L9": "胃痉挛用药",
    };

    static genTextFromDict(strInput, dict, seq=",") {
        if (strInput === null) {
            return "";
        }
        const inputList = strInput.split(seq);
        if (inputList.length === 0) {
            return "";
        }
        const res = []
        for (const input of inputList) {
            if (input in dict) {
                res.push(dict[input]);
            }
        }
        return res.join("、");
    }

}


if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    module.exports.Text = utils.Text;
}