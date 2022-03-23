# vue-source
实现vue3源码

## 如何初始化pnpm工程

```shell
1. pnpm init -y;

2.创建.npmrc文件
shamefully-hoist = true

3.新建 pnpm-workspace.yaml
packages:
  - 'packages/*'

4. 环境搭建
pnpm install typescript rollup rollup-plugin-typescript2 @rollup/plugin-json @rollup/plugin-node-resolve @rollup/plugin-commonjs minimist execa@4 esbuild   -D -w

5. 初始化TS
pnpm tsc --init

{
  "compilerOptions": {
    "outDir": "dist", // 输出的目录
    "sourceMap": true, // 采用sourcemap
    "target": "es2016", // 目标语法
    "module": "esnext", // 模块格式
    "moduleResolution": "node", // 模块解析方式
    "strict": false, // 严格模式
    "resolveJsonModule": true, // 解析json模块
    "esModuleInterop": true, // 允许通过es6语法引入commonjs模块
    "jsx": "preserve", // jsx 不转义
    "lib": ["esnext", "dom"], // 支持的类库 esnext及dom
  }
}

```

## 实现功能：
- [x] 响应式proxy;
- [x] 实现effect;
- [x] 实现依赖收集；
- [x] 实现computed；


## 案例
1. pages/reactive  响应式案例
2. pages/setLoop  set导致死循环的原因
3. pages/cleanup  分支切换与cleanup(分之切换是否删除依赖收集)
4. pages/computed  关于计算属性的实现