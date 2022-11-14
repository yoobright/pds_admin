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

    static kidneyFunctionDcit = {
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
        "-1": "无"
    }

    static breakoutFreqDict = {
        "1": "＜3",
        "2": "≥3",
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
        if (data.length !== 2) {
            return '未知';
        }

        if (data[0] === "s1" || data[0] === "s2") {
            return this.decsionText[data[0]][data[1]]
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
}


if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    module.exports.Text = utils.Text;
}