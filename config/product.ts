import { ProductConfig } from "types";

const enConfig: ProductConfig = {
    title: 'Research Topics',
    subtitle: 'Discover and explore the latest Deep Research reports',
    submitButton: 'Submit Report',
    details: 'Details',
    introduction: 'Introduction',
    github: 'Github',
    source: 'Source',
    price: 'Price',
    website: 'Website',
    submitter: 'Submitter',
    free: 'Free',
    opensource: 'OpenSource',
    date: 'Date',
}

const zhConfig: ProductConfig = {
    title: '研究主题',
    subtitle: '发现和探索最新深度研究报告',
    submitButton: '提交报告',
    details: '详情',
    introduction: '简介',
    github: '代码',
    source: '来源',
    price: '价格',
    website: '官网',
    submitter: '提交者',
    free: '免费',
    opensource: '开源',
    date: '日期',
}

export const AllProductConfigs:{[key: string]: ProductConfig} = {
    en: enConfig,
    zh: zhConfig,
}