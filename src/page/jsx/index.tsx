/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable react/no-multi-comp */
import React  from 'react'

const toLearn = [ 'react' , 'vue' , 'webpack' , 'nodejs'  ]

const TextComponent = ()=> <div> hello , i am function component </div> 

/* TODO: ② */
// class Index extends React.Component{
//     status = false /* 状态 */
//     renderFoot=()=> <div> i am foot</div>
//     /* 控制渲染 */
//     controlRender=()=>{
//         const reactElement = (
//             <div style={{ marginTop:'100px' }} className="container"  >   
//                  { /* element 元素类型 */ }
//                 <div>hello,world</div>  
//                 { /* fragment 类型 */ }
//                 <React.Fragment>      
//                     <div> 👽👽 </div>
//                 </React.Fragment>
//                 { /* text 文本类型 */ }
//                 my name is alien       
//                 { /* 数组节点类型 */ }
//                 { toLearn.map(item=> <div key={item} >let us learn { item } </div> ) } 
//                 { /* 组件类型 */ }
//                 <TextComponent/>  
//                 { /* 三元运算 */  }
//                 { this.status ? <TextComponent /> :  <div>三元运算</div> }  
//                 { /* 函数执行 */ } 
//                 { this.renderFoot() }  
//                 <button onClick={ ()=> console.log( this.render() ) } >打印render后的内容</button>
//             </div>
//         )
//         // console.log(reactElement)
//         const { children } = reactElement.props
//         /* 第一步 ： 扁平化 children  */
//         const flatChildren = React.Children.toArray(children)
//         // console.log(flatChildren)
//         /* 第二步 ： 除去文本节点 */
//         const newChildren :any= []
//         React.Children.forEach(flatChildren,(item)=>{
//             if(React.isValidElement(item)) newChildren.push(item)
//         })
//         /* 第三步，插入新的节点 */
//         const lastChildren = React.createElement(`div`,{ className :'last' } ,`say goodbye`)
//         newChildren.push(lastChildren)
        
//         /* 第四步：修改容器节点 */
//         const newReactElement =  React.cloneElement(reactElement,{} ,...newChildren )
//         return newReactElement
//     }
//     render(){
//         return this.controlRender()
//     }
// }

/* TODO: ①  */
// class Index extends React.Component{
//     status = false /* 状态 */
//     componentDidMount(){ console.log('asdsadasdasdasd') }
//     renderFoot=()=> <div> i am foot</div>
//     render(){
//         /* 以下都是我们常用的jsx元素节 */
//         return <div style={{ marginTop:'100px' }} >
//             { /* element 元素类型 */ }
//             <div>hello,world</div>
//             { /* fragment 类型 */ }
//             <React.Fragment>
//                 <div> 👽👽 </div>
//             </React.Fragment>
//             { /* text 文本类型 */ }
//             my name is alien 
//             { /* 数组节点类型 */ }
//             { toLearn.map(item=> <div key={item} >let us learn { item } </div> ) }
//             { /* 组件类型 */ }
//             <TextComponent/>
//             { /* 三元运算 */  }
//             { this.status ? <TextComponent /> :  <div>三元运算</div> }
//             { /* 函数执行 */ } 
//             { this.renderFoot() }
//             <button onClick={ ()=> console.log( this.render() ) } >打印render后的内容</button>
//         </div>
//     }
// }
// 将上述children扁平化处理，将数组类型的子节点打开 ；
// 干掉children中文本类型节点；
// 向children最后插入
// say goodbye
// 元素；
// 克隆新的元素节点并渲染。

class Index extends React.Component {
    componentDidMount() {
        console.log('componentDidMount');
    }
    status = false;
    renderFoot = () => <div>i am foot</div>
    controlRender = () => {
        const reactElement = (
            <div style={{ marginTop:'100px' }} >
            { /* element 元素类型 */ }
            <div>hello,world</div>
            { /* fragment 类型 */ }
            <React.Fragment>
                <div> 👽👽 </div>
            </React.Fragment>
            { /* text 文本类型 */ }
            my name is alien 
            { /* 数组节点类型 */ }
            { toLearn.map(item=> <div key={item} >let us learn { item } </div> ) }
            { /* 组件类型 */ }
            <TextComponent/>
            { /* 三元运算 */  }
            { this.status ? <TextComponent /> :  <div>三元运算</div> }
            { /* 函数执行 */ } 
            { this.renderFoot() }
            <button onClick={ ()=> console.log( this.render() ) } >打印render后的内容</button>
        </div>
        )
        const {children} = reactElement.props;
        const flatChildren = React.Children.toArray(children);
        // const newChildren: ReactElement = [];
        const newChildren: any = [];
        React.Children.forEach(children, child => {
            if (React.isValidElement(child)) newChildren.push(child);
        })
        console.log('children: ', children);
        console.log('flatChildren: ', flatChildren);
        console.log('newChildren: ', newChildren);
        const lastChild = React.createElement('div', {className: 'last'}, 'say goodbye');
        newChildren.push(lastChild)
        // const newReactElement = React.cloneElement(reactElement, {}, ...newChildren);
        console.log('reactElement: ', reactElement);
        // return newReactElement;
        return reactElement;
    }
    render () {
        return this.controlRender()
    }
}

export default Index