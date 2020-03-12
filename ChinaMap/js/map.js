window.onload = function() {
    fetch(
        "http://api.tianapi.com/txapi/ncovcity/index?key=16f1c0db1b22ff8fab4c9a6b254ec0e5"
    ).then(resp => {
        resp.json().then( json => {
            let data = json.newslist
            console.log('** ',JSON.stringify(json))
            renderMap(data, "9999");
        });
    });
    function renderMap(data, date) {
        console.log(JSON.stringify(data))
        data2 = data.map(
            ({ provinceName, provinceShortName, currentConfirmedCount, suspectedCount, confirmedCount, curedCount, deadCount}) => ({
                name: provinceShortName,
                value: confirmedCount,
                provinceName,
                suspectedCount,
                curedCount,
                deadCount,
                itemStyle: {
                    color: (confirmedCount => {
                        confirmedCount = +confirmedCount;
                        if (confirmedCount > 10000) return "#7f1818";
                        if (confirmedCount > 1000) return "#bf2121";
                        if (confirmedCount > 100) return "#ff7b69";
                        if (confirmedCount > 0) return "#e6df0278";
                        return "#ffffff";
                    })(confirmedCount)
                }
            })
        );
        let nanhai = [{name: "南海诸岛", value: 0, curedCount: 0, deadCount: 0, itemStyle: {color: "#ffffff"}}];
        data2 = nanhai.concat(data2);
        console.log('----' + JSON.stringify(data2))
        let chart = echarts.init(document.getElementById("main"));
        option = {
            title: {
                text: "地图",
                left: 'center',
                subtext: `数据更新至：${date}`
            },
            // visualMap: {
            //     min: 0,
            //     max: 100,
            //     left: 'left',
            //     top: 'bottom',
            //     text: ['高','低'], // 取值范围的文字
            //     inRange: {
            //         color: ['#ffaa85', '#7f1818'] // 取值范围的颜色
            //     },
            //     show: true // 图注
            // },
            geo: {
                map: 'world',
                roam: false, // 不开启缩放和平移
                zoom: 1.23, // 视角缩放比例
                label: {
                    normal: {
                        show: false,
                        fontSize:'10',
                        color: 'rgba(0,0,0,0.7)'
                    }
                },
                itemStyle: {
                    normal:{
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    emphasis:{
                        areaColor: '#10d8e28f',//鼠标选择区域颜色
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 10,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                    }
                }
            },
            series: [
                {
                    type: "map",
                    // map: "china",
                    geoIndex: 0,
                    data: data2
                }
            ],
            tooltip: {
                trigger: "item",
                showDelay: 0,
                transitionDuration: 0.2,
                formatter: function(params, ticket, callback) {
                    console.log('### ',JSON.stringify(params))
                    return `
                    ${params.name}<br/>`
                    // 确诊病例：${params.value}<br/>
                    // 疑是病例：${params.data.suspectedCount}<br/>
                    // 治愈病例：${params.data.curedCount}<br/>
                    // 死亡病例：${params.data.deadCount}<br/>
                    // `;
                }
            },
            
        };
        chart.setOption(option);
    }
};
