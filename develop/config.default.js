define({
  single_building: {
    1000010001: {
      tab_title: '易卡休闲购物广场',
      title: '易卡休闲购物广场',
      theme_color: '#ca0c00',
      rows_length: 6,
      widgets: {
        danweijieshao: {
          type: 'widget-about-info',
          title: '单位介绍',
          subtitle: '',
          row: 1,
          column: 1,
          width: 2,
          height: 1
        },
        nenghaorili: {
          type: 'widget-energy-calendar',
          title: '能耗日历',
          subtitle: '',
          row: 1,
          column: 3,
          width: 2,
          height: 1
        },
        shishijiankong: {
          type: 'widget-day-monitoring',
          title: '24小时功率实时监控',
          subtitle: '',
          row: 2,
          column: 1,
          width: 2,
          height: 1
        },
        bianyaqifuzailvqiansan: {
          type: 'widget-load-top3',
          title: '变压器负载率前三',
          subtitle: '',
          row: 2,
          column: 3,
          width: 1,
          height: 1,
          data_type: 'Transformer'
        },
        bianyaqiwenduqiansan: {
          type: 'widget-temperature-top3',
          title: '变压器温度前三',
          subtitle: '',
          row: 2,
          column: 4,
          width: 1,
          height: 1,
          limit: 100,
          data_type: 'Temperature'
        },
        nenghaoqushi: {
          type: 'widget-energy-trend',
          title: '建筑能耗趋势',
          subtitle: '全部能耗类型时折算为标煤',
          row: 3,
          column: 1,
          width: 2,
          height: 2,
          current_color: '#eb525d'
        },
        gediqunenghaozhanbi: {
          type: 'widget-pie-hollow-data',
          title: '本年度分户能耗占比',
          subtitle: '折算为标煤',
          row: 3,
          column: 3,
          width: 2,
          height: 1,
          data_type: 'TenementEnergy',
          sum_title: '总能耗',
          colors: ['#308286', '#0dbac3', '#78d5a5', '#d2f185', '#75b51c', '#b9e1cb', '#74bde7', '#c7c17f']
        },
        benniannenghaofenxiangzhanbi: {
          type: 'widget-pie-solid-text',
          title: '本年能耗分项占比',
          subtitle: '',
          row: 4,
          column: 3,
          width: 2,
          height: 1,
          data_type: 'EnergyItem',
          colors: ['#f09a61', '#74bde7', '#78d5a5', '#d2f185']
        },
        jianzhuzongnenghao: {
          type: 'widget-year-energy-total',
          title: '$year$年建筑总能耗',
          subtitle: '',
          row: 5,
          column: 1,
          width: 4,
          height: 1,
          higher_color: '#f5605c',
          current_color: '#5fbbb6'
        },
        baobaodayin: {
          type: 'widget-print-report',
          title: '最常打印报表',
          subtitle: '',
          show_more: true,
          row: 6,
          column: 1,
          width: 1,
          height: 1
        }
      }
    }
  },
  multi_building: {
    tab_title: '博锐尚格',
    title: '博锐尚格能源管理平台',
    theme_color: '#ca0c00',
    rows_length: 6,
    widgets: {
      danweijieshao: {
        type: 'widget-about-info',
        title: '单位介绍',
        subtitle: '',
        row: 1,
        column: 1,
        width: 2,
        height: 1
      },
      jienengtongji: {
        type: 'widget-energy-saving-count',
        title: '节能统计',
        subtitle: '折算为标煤',
        row: 2,
        column: 1,
        width: 1,
        height: 1
      },
      jienenggaizaochengguozhanshi: {
        type: 'widget-energy-saving-display',
        title: '节能改造成果展示',
        subtitle: '',
        row: 2,
        column: 2,
        width: 1,
        height: 1
      },
      zhibiaozengfuqiansan: {
        type: 'widget-amplification-top3',
        title: '用电指标增幅最大前三名',
        subtitle: '相对于昨日同期',
        row: 4,
        column: 1,
        width: 2,
        height: 1,
        color: '#eb525d',
        formula: 'shebeiji1/10000',
        time_type: 2,
        up_down: 'up',
        unit: 'kWh'
      },
      zhibiaojianfuqiansan: {
        type: 'widget-amplification-top3',
        title: '用电指标减幅最大前三名',
        subtitle: '相对于昨日同期',
        row: 4,
        column: 3,
        width: 2,
        height: 1,
        color: '#00a699',
        formula: 'shebeiji1/10000',
        time_type: 2,
        up_down: 'down',
        unit: 'kWh'
      },
      gediqunenghaozhanbi: {
        type: 'widget-pie-hollow-data',
        title: '各地区本年度能耗占比',
        subtitle: '折算为标煤',
        row: 3,
        column: 1,
        width: 2,
        height: 1,
        data_type: 'AreaEnergy',
        sum_title: '总能耗',
        colors: ['#308286', '#0dbac3', '#78d5a5', '#d2f185', '#75b51c', '#b9e1cb', '#74bde7', '#c7c17f']
      },
      benniannenghaofenxiangzhanbi: {
        type: 'widget-pie-solid-text',
        title: '本年能耗分项占比',
        subtitle: '',
        row: 3,
        column: 3,
        width: 2,
        height: 1,
        data_type: 'EnergyItem',
        colors: ['#f09a61', '#74bde7', '#78d5a5', '#d2f185']
      },
      jianzhuzongnenghao: {
        type: 'widget-year-energy-total',
        title: '$year$年建筑总能耗',
        subtitle: '',
        row: 5,
        column: 1,
        width: 4,
        height: 1,
        higher_color: '#f5605c',
        current_color: '#5fbbb6'
      },
      nenghaoqushi: {
        type: 'widget-energy-trend',
        title: '建筑能耗趋势',
        subtitle: '全部能耗类型时折算为标煤',
        row: 1,
        column: 3,
        width: 2,
        height: 2,
        current_color: '#eb525d'
      },
      baobaodayin: {
        type: 'widget-print-report',
        title: '最常打印报表',
        subtitle: '',
        show_more: true,
        row: 6,
        column: 1,
        width: 1,
        height: 1
      }
    }
  }
});
