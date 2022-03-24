import React from 'react';
import './style.scss';

function VirtualList() {
	const [dataList, setDataList] = React.useState([]); /* 保存数据源 */
	const [position, setPosition] = React.useState([
		0, 0,
	]); /* 截取缓冲区 + 视图区索引 */
	const scroll = React.useRef(null);
	const box = React.useRef(null);
	const context = React.useRef(null);
	const scrollInfo = React.useRef({
		height: 500 /* 容器高度 */,
		// bufferCount: 8 /* 缓冲区个数 */,
		bufferCount: 0 /* 缓冲区个数 */,
		itemHeight: 60 /* 每一个item高度 */,
		renderCount: 0 /* 渲染区个数 */,
	});
	React.useEffect(() => {
		const height = box.current.offsetHeight; // 小屏729(根据fixed高度决定的) 大屏909
		console.log('height: ', height);
		const { itemHeight, bufferCount } = scrollInfo.current;
		const renderCount = Math.ceil(height / itemHeight) + bufferCount; // 24
		// console.log('renderCount: ', renderCount);
		scrollInfo.current = { renderCount, height, bufferCount, itemHeight };
		const dataList = new Array(10000)
			.fill(1)
			.map((item, index) => index + 1);
		setDataList(dataList);
		setPosition([0, renderCount]);
	}, []);
	const handleScroll = () => {
		const { scrollTop } = scroll.current;
		const { itemHeight, renderCount } = scrollInfo.current;
		const currentOffset = scrollTop - (scrollTop % itemHeight);
		const start = Math.floor(scrollTop / itemHeight);
		// 因为列表高度不足，靠translate模拟滚动条
		context.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`;
		const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
		// 在不设置缓存区的情况下，起初positon为[0,13] (bufferCount为0时)
		// 监听滚动事件end值从0变化，到14时()
		// 原理：根据滚动距离，计算要可视区域要展示list的start、end索引，然后setState重新设置要渲染的list，
		if (end !== position[1] || start !== position[0]) {
			// debugger
			console.log('end: ', end, 'start:', start, 'renderCount', renderCount); // 33 21
			/* 如果render内容发生改变，那么截取  */
			setPosition([start, end]);
		}
	};
	const { itemHeight, height } = scrollInfo.current;
	const [start, end] = position;
	const renderList = dataList.slice(start, end);
	// console.log('渲染区间', position);
	return (
		<div className='list_box' ref={box}>
			<div
				className='scroll_box'
				onScroll={handleScroll}
				ref={scroll}
				style={{ height: height + 'px' }}
			>
				{/* <div
					className='scroll_hold'
					style={{ height: `${dataList.length * itemHeight}px` }}
				/> */}
				<div className='context' ref={context}>
					{renderList.map((item, index) => (
						<div className='list' key={index}>
							{' '}
							{item + ''} Item{' '}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default VirtualList;
