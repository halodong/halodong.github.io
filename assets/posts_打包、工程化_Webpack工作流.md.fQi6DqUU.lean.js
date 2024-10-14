import{_ as e,c as i,a4 as a,o}from"./chunks/framework.z0Ka7qmk.js";const h=JSON.parse('{"title":"Webpack工作流","description":"","frontmatter":{"title":"Webpack工作流","date":"2022-03-16T12:57:18.000Z","author":"RuiLin Dong","permalink":"/read/20220316010320","categories":["打包、工程化"],"tags":["模块化","打包","工程化"]},"headers":[],"relativePath":"posts/打包、工程化/Webpack工作流.md","filePath":"posts/打包、工程化/Webpack工作流.md"}'),t={name:"posts/打包、工程化/Webpack工作流.md"};function r(n,l,d,s,u,c){return o(),i("div",null,l[0]||(l[0]=[a('<h2 id="webpack" tabindex="-1">Webpack <a class="header-anchor" href="#webpack" aria-label="Permalink to &quot;Webpack&quot;">​</a></h2><p>本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。</p><h2 id="工作流" tabindex="-1">工作流 <a class="header-anchor" href="#工作流" aria-label="Permalink to &quot;工作流&quot;">​</a></h2><p>webpack 构建的核心任务是完成内容转化和资源合并。主要包含以下 3 个阶段：</p><ul><li><strong>初始化阶段</strong><ul><li>初始化参数：从配置文件、配置对象和Shell参数中读取并与默认参数进行合并，组合成最终使用的参数。</li><li>创建编译对象：用上一步得到的参数创建 Compiler 对象。</li><li>初始化编译环境：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等。</li></ul></li><li><strong>构建阶段</strong><ul><li>开始编译：执行 Compiler 对象的 run 方法，创建 Compilation 对象。</li><li>确认编译入口：进入 entryOption 阶段，读取配置的 Entries，递归遍历所有的入口文件，调用 Compilation.addEntry 将入口文件转换为 Dependency 对象。</li><li>编译模块： 调用 normalModule 中的 build 开启构建，从 entry 文件开始，调用 loader 对模块进行转译处理，然后调用 JS 解释器（acorn）将内容转化为 AST 对象，然后递归分析依赖，依次处理全部文件。</li><li>完成模块编译：在上一步处理好所有模块后，得到模块编译产物和依赖关系图。</li></ul></li><li><strong>生成阶段</strong><ul><li>输出资源：根据入口和模块之间的依赖关系，组装成多个包含多个模块的 Chunk，再把每个 Chunk 转换成一个 Asset 加入到输出列表，这步是可以修改输出内容的最后机会。</li><li>写入文件系统：确定好输出内容后，根据配置的 output 将内容写入文件系统。</li></ul></li></ul><h2 id="深入" tabindex="-1">深入 <a class="header-anchor" href="#深入" aria-label="Permalink to &quot;深入&quot;">​</a></h2><h3 id="初始化阶段" tabindex="-1">初始化阶段 <a class="header-anchor" href="#初始化阶段" aria-label="Permalink to &quot;初始化阶段&quot;">​</a></h3><p>简单说，初始化阶段的任务就是合并配置，并且生成 compiler 实例。</p><ul><li>将 process.args + webpack.config.js 合并成用户配置</li><li>调用 validateSchema 校验配置</li><li>调用 createCompiler 创建 Compiler 对象。</li><li>遍历用户定义的 plugins 集合，执行插件的 apply 方法</li><li>触发 environment 和 afterEnvironment 上注册的事件。</li><li>调用 new WebpackOptionsApply().process 方法，加载各种内置插件</li><li>触发 initialize 事件。</li></ul><h3 id="构建阶段" tabindex="-1">构建阶段 <a class="header-anchor" href="#构建阶段" aria-label="Permalink to &quot;构建阶段&quot;">​</a></h3><p><img src="https://user-images.githubusercontent.com/15681693/134162956-d7210d3a-2881-4d0c-b84b-0a1b813a8d0f.png" alt=""></p><ul><li>在实例化 compiler 之后，执行 compiler.run()。</li><li>执行 newCompilation 函数，调用 createCompilation 初始化 Compilation 对象。</li><li>执行 _addEntryItem 将入口文件存入 this.entries（map 对象），遍历 this.entries 对象构建 chunk。</li><li>执行 handleModuleCreation，开始创建模块实例。</li><li>执行 moduleFactory.create 创建模块。</li><li>执行 factory.hooks.factorize.call 钩子，然后会调用 ExternalModuleFactoryPlugin 中注册的钩子，用于配置外部文件的模块加载方式。</li><li>使用 enhanced-resolve 解析模块和 loader 的真实绝对路径。</li><li>执行 new NormalModule()创建 module 实例。</li><li>执行 addModule，存储 module。</li><li>执行 buildModule，添加模块到模块队列 buildQueue，开始构建模块, 这里会调用 normalModule 中的 build 开启构建。</li><li>创建 loader 上下文。</li><li>执行 runLoaders，通过 enhanced-resolve 解析得到的模块和 loader 的路径获取函数，执行 loader。</li><li>生成模块的 hash。</li></ul><h3 id="生成阶段" tabindex="-1">生成阶段 <a class="header-anchor" href="#生成阶段" aria-label="Permalink to &quot;生成阶段&quot;">​</a></h3><ul><li>构建本次编译的 ChunkGraph 对象</li><li>遍历 compilation.modules 集合，将 module 按 entry/动态引入 的规则分配给不同的 Chunk 对象</li><li>compilation.modules 集合遍历完毕后，得到完整的 chunks 集合对象</li><li>遍历 module/chunk</li><li>触发 seal 回调</li></ul>',14)]))}const m=e(t,[["render",r]]);export{h as __pageData,m as default};
