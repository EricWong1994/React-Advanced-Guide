/* eslint-disable react/no-multi-comp */
import React, { useRef, useState } from 'react';
import { cloneElement } from 'react';

/**
 * 接下来到实践环节了。需要编写一个实践 demo ，用于表单状态管理的<Form> 和 <FormItem> 组件
    <Form>用于管理表单状态；
    <FormItem>用于管理<Input>输入框组件。,
    编写的组件能够实现的功能是：
    ①Form 组件可以被 ref 获取实例。然后可以调用实例方法 submitForm 获取表单内容，用于提交表单，resetForm 方法用于重置表单。
    ②Form组件自动过滤掉除了FormItem之外的其他React元素
    ③FormItem 中 name 属性作为表单提交时候的 key ，还有展示的 label 。
    ④ FormItem 可以自动收集 <Input/> 表单的值。
 */

/**
 * 1、Form加ref，如果是函数时组件得用到forwardRef 和 useImperativeHandle。故改为类的形式
 * 2、过滤功能需要根据组件类型type进行筛选
 * 3、submitForm 获取表单内容即submitForm接受一个callback, Form组件需要创建一个formData的state，用来收集formitem的值(key: value)
 * 将FormItem变成受控组件，更容易操作，(value提升，当做props传给他，)
 * 4 input也可封装起来
 * 5 FormItem不要直接使用Input组件，而是通过原生方法操作
 */
// function Form(props) {
// 	const { children } = props;
// 	return <div>Form</div>;
// }
class Form extends React.Component {
	state = {
		formData: {},
	};
	componentDidMount() {
		// const { children } = this.props;
		this.renderControl();
	}

	submitForm = callback => {
		callback && callback(this.state.formData);
	};

	resetForm = () => {
		this.setState({
			formData: {},
		});
	};

	changeFormData = (name, value) => {
		this.setState({
			formData: {
				...this.state.formData,
				[name]: value,
			},
		});
	};

	renderControl = () => {
		const { children } = this.props;
		const newChildren = [];
		React.Children.forEach(children, child => {
			if (child.type.displayName === 'formItem') {
				const { name, label } = child.props;
				const Children = React.cloneElement(
					child,
					{
						key: name,
						label,
						value: this.state.formData[name] || '',
						changeFormData: this.changeFormData,
					},
					// child.children // 写错了应该是child.props.children
					child.props.children
				);
				newChildren.push(Children);
			}
		});
		return newChildren;
	};

	render() {
		return <div>{this.renderControl()}</div>;
	}
}

function FormItem(props) {
	const { name, label, value, changeFormData, children } = props;
	const onChange = value => {
		changeFormData(name, value);
	};
	return (
		<div style={{ marginTop: '10px' }}>
			<span>{label}</span>
			{React.isValidElement(children) &&
			children.type.displayName === 'input'
				? React.cloneElement(children, { value, onChange })
				: null}
			{/* <Input onChange={change} value={value} /> */}
		</div>
	);
}
FormItem.displayName = 'formItem';

function Input(props) {
	const { value, onChange } = props;

	return (
		<input
			onChange={e => onChange && onChange(e.target.value)}
			type='text'
			value={value}
		/>
	);
}
Input.displayName = 'input';

export default () => {
	const form = useRef({ current: null });
	const submit = () => {
		form.current.submitForm(formData => {
			console.log('formData: ', formData);
		});
	};

	const reset = () => {
		form.current.resetForm();
	};

	return (
		<div className='box'>
			<Form ref={form}>
				<h1>1234</h1>
				<FormItem label='姓名' name='username'>
					<Input />
				</FormItem>
				<FormItem label='年龄' name='age'>
					<Input />
				</FormItem>
				<div>123</div>
			</Form>
			<div className='btns'>
				<button className='searchbtn' onClick={submit}>
					提交
				</button>
				<button className='concellbtn' onClick={reset}>
					重置
				</button>
			</div>
		</div>
	);
};
