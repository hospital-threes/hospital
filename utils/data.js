//域名+端口号
var WYY_HOST_URL = "http://192.168.34.176:8080";
var type = "Fitment";
module.exports = {
  wyy_host_api_url: WYY_HOST_URL,
  wyy_user_wxappid: "6",
  wyy_share_info: '',
  wyy_config_version: 2567,
  //获取充值信息 
  user_recharge: WYY_HOST_URL + "/m/recharge/money/anon",
  //确定充值 
  user_recharge_re: WYY_HOST_URL + "/m/recharge/create"
}