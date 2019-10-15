//正则是引用数据类型
var reg = /\d/;//字符串中只要 有数字即可
var reg = /^\d/;//字符串需要以数字开头
var reg =/^\dqqq/;//字符串必须以数字开头 数字后边必须是qqq
console.log(reg.test('123qqq'))
var reg =/\d$/;//字符需要以数字结尾
var reg =/qqq\d$/;//字符串需要以数字结尾 数字前边必须是qqq
var reg =/^\d$/;//只能匹配单个数字
var reg = new RegExp('\\d');

console.log(reg.test('qwer234wer'))

var reg = /^\d*$/
console.log(reg.test('100'))//true
console.log(reg.test('0'))//true
console.log(reg.test(''))//true 

var reg = /\d{3}/;//\d\d\d 连续出现3次
console.log(reg.test('11244545'))//true
console.log(reg.test('qqq32qqqq0'))//false

var reg = /^\d{3}$/

console.log(reg.test('2545484887'))//false
console.log(reg.test('qqq34qqqqq0'))//false
console.log(reg.test('123')) //true

var reg = /^[1.2]$/  //中括号中的点就是点本身   中括号里的是1或.或2
console.log(reg.test('1.2'))//false
console.log(reg.test('1q2'))//false
console.log(reg.test('1'))//true
console.log(reg.test('12'))//false
console.log(reg.test('2'))//true
console.log(reg.test('.'))//true
console.log(reg.test('q'))//false

var reg = /^[1.2]*$/  //只要字符串是由2 1 . 三个字符组成的 都是true
console.log(reg.test('1.2'))//true
console.log(reg.test('1q2'))//false
console.log(reg.test('1'))//true
console.log(reg.test('12'))//true
console.log(reg.test('2'))//true
console.log(reg.test('.'))//true
console.log(reg.test('q'))//false
console.log(reg.test(''))//true


var reg = /^18|19/; //以18开头 或者有19   （或的优先级高；他把两边当作了两个整体）
console.log(reg.test('18'))
console.log(reg.test('19'))
console.log(reg.test('189'))
console.log(reg.test('1819'))
console.log(reg.test('118'))
console.log(reg.test('1918'))

var reg = /18|19$/;
console.log(reg.test('18'))//true
console.log(reg.test('19'))//true
console.log(reg.test('189'))//true
console.log(reg.test('1819'))//true
console.log(reg.test('118'))//true
console.log(reg.test('1918'))//true

var reg = /^18|19$/; //以18 开头或以19结尾
console.log(reg.test('18'))//true
console.log(reg.test('19'))//true
console.log(reg.test('189'))//true
console.log(reg.test('1819'))//true
console.log(reg.test('118'))//false
console.log(reg.test('1918'))//false

var reg = /^(18|19)$/; // /^18$/ /^19$/
var reg = /^1[89]$/
console.log(reg.test('18'))//true
console.log(reg.test('19'))//true
console.log(reg.test('189'))//false
console.log(reg.test('1819'))//false
console.log(reg.test('118'))//false
console.log(reg.test('1918'))//false

var reg = /windows(?=95|98|NT|2000)/;//除了匹配windows 后面还要跟着95|98|NT|2000

var reg = /windows(?!95|98|NT|2000)/; //windows后面不能是这几个东西