/* eslint-disable react/no-multi-comp */
import React ,{ useState } from 'react'
import { cloneElement } from 'react';



// function ChidrenComponent(){
//     return <div> In this chapter, let's learn about react props ! </div>
// }

// class PropsComponent extends React.Component{
//     componentDidMount(){
//         console.log(this,'_this')
//     }

//     render(){
//         setTimeout(()=>{
//             console.log(this,'_this')
//         },100)
//         const {  children , mes , renderName , say ,Component } = this.props
//         return <div>
//             { children[0]() }
//             {mes}
//             { renderName() }
//             { children[1] }
//             <Component />
//             <button onClick={ () => say() } > change content </button>
//         </div>
//     }
// }

// class Index extends React.Component{
//     state={
//         mes: "hello,React"
//     }
//     node = null
//     say= () =>  this.setState({ mes:'let us learn React!' })
//     render(){
//         return <div>
//             <PropsComponent
//                mes={this.state.mes}
//                say={ this.say  }
//                Component={ ChidrenComponent }
//                renderName={ ()=><div> my name is alien </div> }
//             >
//                 { ()=> <div>hello,world</div>  }
//                 <ChidrenComponent />
//             </PropsComponent>
//         </div>
//     }
// }

// function Son(){
//     const
//     return <div></div>
// }

// function Father(){
//     /* setNumber 作为回调杉树 */
//     const [ number ,setNumber ] = React.useState(0)
//     return <div>
//         <Son
//         changeNumer={setNumber}
//         mes="hello,wrold"
//         />
//          { number }
//     </div>
// }


/* TODO:  */
// function Son(props){
//     console.log(props)
//     return <div> hello,world </div>
// }

// function Father(props){
//     const { age,...fatherProps  } = props
//     return <Son  { ...fatherProps }  />
// }
// function Index(){
//     const indexProps = {
//         name:'alien',
//         age:'28',
//         mes:'let us learn React !'
//     }
//     return <Father { ...indexProps }  />
// }


/** TODO: 隐式混入 */
// function Son(props){
//      console.log(props) // {name: "alien", age: "28", mes: "let us learn React !"}
//      return <div> hello,world </div>
// }
// function Father(prop){
//     return React.cloneElement(prop.children,{  mes:'let us learn React !' })
// }
// function Index(){
//     return <Father>
//         <Son  name="alien"  age="28"  />
//     </Father>
// }


// export default Index


// class Index extends React.Component{
//     shouldComponentUpdate(){
//         this.render()
//         return true
//     }
//     render(){
//         return <div className="box" >
//             <FatherComponent>
//                 <SonComponent name="alien"  />
//             </FatherComponent>
//         </div>
//     }
// }
function Input({changeInputValue, value}) {
    return <input
        onChange={e => changeInputValue(e.target.value)}
        value={value}
           />
}
Input.displayName = 'input';
function FormItem (props){
    const {name, label, changeFormData, children, value} = props;
    //key 打印不到undefined 查了一下 我分析 key 是一个不让读写的属性
    const changeInputValue = value => {
        console.log('value: ', value);
        changeFormData(name, value);
    }

    return (<div>
        <span>{label}:</span>
        {React.isValidElement(children) && children.type.displayName === 'input' ? React.cloneElement(children, {
            changeInputValue,
            value
        }) : null}
    </div>)
}
FormItem.displayName = 'form-item';
// span input 提及
// - ②`Form`组件自动过滤掉除了`FormItem`之外的其他React元素
// - ③`FormItem` 中 name 属性作为表单提交时候的 key ，还有展示的 label 。
// - ④ `FormItem` 可以自动收集 `<Input/>` 表单的值。
class Form extends React.Component {
    state = {formData: {}}
    submitForm = (callback) => {
        callback(this.state.formData);
    }
    resetForm = () => {
        const { formData } = this.state
        Object.keys(formData).forEach(item=>{
            formData[item] = ''
        })
        this.setState({
            formData
        })
    }
    changeFormData = (name, value) => {
        console.log('name, value: ', name, value);
        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        })
    }
    render() {
        const {children} = this.props;
        const newChildren = [];
        React.Children.forEach(children, (child) => {
            if (child.type.displayName === 'form-item') {
                const { name, label } = child.props

                const Children = React.cloneElement(child, {
                    label: label,
                    key: name,
                    value: this.state.formData[name] || '',
                    changeFormData: this.changeFormData
                }, child.props.children)
                // }, child.children)
                newChildren.push(Children);
            }
        })
        return newChildren;
    }
}

export default  () => {
    const form = React.useRef(null)
    const submit = () => {
        /* 表单提交 */
        form.current.submitForm((formValue)=>{
            console.log('formValue: ', formValue);
        })
    }
    const reset = () => {
        /* 表单重置 */
        form.current.resetForm()
    }
    return <div className="box" >
        <Form ref={form}>
            <FormItem label="我是"
                name="name"
            >
                <Input />
                {/* <div>222</div> */}
            </FormItem>
            <FormItem label="我想对大家说"
                name="mes"
            >
                <Input />
            </FormItem>
            <input placeholder="不需要的input"/>
            <Input />
        </Form>
        <div className="btns" >
            <button className="searchbtn"
                onClick={submit}
            >提交</button>
            <button className="concellbtn"
                onClick={reset}
            >重置</button>
        </div>
    </div>
}


