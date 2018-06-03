import evt from '../event';
import store from './index';

//	action列表
const actionsArr = [
	//	用户信息初始化
	'user/GET_USERINFO',
	//	设备信息初始化
	'device/GET_DEVICEINFO'
];

//	actions对应触发的mutation列表
let mutationsArr = [
	//	设置用户信息
	'user/SET_USERINFO',
	//	设置设备信息
	'device/SET_DEVICEINFO'
];

const init = () => {
	return new Promise((resolve, reject) => {
		var count = mutationsArr.length;
		store.subscribe(({
			type,
			payload
		}) => {
			if (!~mutationsArr.indexOf(type)) {
				return;
			}
			//	触发的mutation在对应列表内
			count--;
			if (count < 1) {
				//	当actions对应触发的mutation列表内的mutation都触发完，返回成功
				//	由于这个是web从app或cookie上获取数据，一般不存在异常情况，所以没有做reject处理
				resolve();
			}
		});

		//	触发actions
		actionsArr.forEach(function (item) {
			store.dispatch(item);
		});

	});
}

export default init;