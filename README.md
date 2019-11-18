# demo-admin-vue

基于vue-admin-template二次封装的管理后台

服务器api接口的实现用到thinkphp5.1，地址：https://github.com/carolsail/demo-admin-api-tp5.git

## Build Setup


```bash
# clone the project
git clone https://github.com/carolsail/demo-admin-vue.git

# enter the project directory
cd demo-admin-vue

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

## 封装

api中加入base.js，利用类继承的方式将后台中curd进行了一层封装，省去curd的重复代码，而额外功能则进行拓展

SailDatePicker，封装element-ui中的DatePicker，支持单一日期或关联日期

SailForm，将表单的提交进行了封装，省去表单中提交等功能的重复代码，而额外功能可通过$emit进行实现

SailModel，封装element-ui中的model，可配合SailForm等其他组件灵活使用

SailTable，封装Table列表，集成搜索、重置、excel导出、添加、修改、删除等操作，组合参数与服务端通过ajax数据交互

SailUpload，封装上传组件，支持单个或多个文件的上传
