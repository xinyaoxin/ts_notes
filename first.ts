/**
 *类型定义
 *类型检查器会查看printLabel的调用。 printLabel有一个参数，并要求这个对象参数有一个名为label类型为string的属性。 
 *需要注意的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配。
 */
function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

/**
 * 接口
 * 可选属性在定义时对可选属性加 “？”
 * 接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 
 * 可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。
 * 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。
 * 好处一 可选属性的好处之一是可以对可能存在的属性进行 “预定义”，
 * 好处二 是可以捕获引用了不存在的属性时的错误。
 * 比如，我们故意将 createSquare里的color属性名拼错，就会得到一个错误提示：
 */
/**
 * 只读属性
 * 只能在创建之初修改
 * 不能修改 不可分配 
 * 但是你可以用类型断言重写：
 */
let a: number[] = [1, 2, 3, 4];
let b: number[] = []
let ro: ReadonlyArray<number> = a;
//  ro[0] = 12; // error!
//  ro.push(5); // error!
//  ro.length = 100; // error!
//  a = ro; // error!
// a = ro as number[];
b = <number[]>ro
console.log('**b**', b)

// interface SquareConfig {
//     //只读属性
//     // readonly x: number;
//     // readonly y: number

//     color?: string;
//     width?: number;
// }

interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;  //字符串索引签名
}

function createSquare(config: SquareConfig): { color: string; area: number; address?: string } {
    let newSquare = { color: "white", area: 100, address: 'shanghai' };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    if (config.address) {
        newSquare.address = config.address
    }
    return newSquare;
}

// let mySquare = createSquare({ color: "black" });

/*******
 * 当传入的属性没有的时候 会出现如下错误
 * 类型“{ colour: string; width: number; }”的参数不能赋给类型“SquareConfig”的参数。
 * 对象文字只能指定已知的属性，但“colour”中不存在类型“SquareConfig”。是否要写入 color?ts(2345)
 * 可以用类型断言解决
 * let mySquare = createSquare({ colour: "red", width: 100 }as SquareConfig);
 * 或者添加字符串索引签名
 * interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
 */
let mySquare = createSquare({ colour: "red", width: 100, address: 'china' });

console.log('result', mySquare)



// interface SquareConfig {
//     color?: string;
//     width?: number;
//   }

//   function createSquare(config: SquareConfig): { color: string; area: number } {
//     let newSquare = {color: "white", area: 100};
//     if (config.clor) {
//       // Error: Property 'clor' does not exist on type 'SquareConfig'
//       newSquare.color = config.clor;
//     }
//     if (config.width) {
//       newSquare.area = config.width * config.width;
//     }
//     return newSquare;
//   }

//   let mySquare = createSquare({color: "black"});


/**
 * 函数类型接口
 * 
 */

interface SearchFunc {
    (source: string, subString: string): boolean; //调用签名
}

// let mySearch: SearchFunc;
// mySearch = function(src: string, sub: string): boolean {
//   let result = src.search(sub);
//   return result > -1;
// }

let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}

/**
 * 可索引的类型
 * 我们也可以  描述  那些能够 “通过索引得到” 的类型，
 * 数字索引签名必须时字符串索引签名的子类
 * 它描述了对象索引的类型，还有相应的索引返回值类型。
 * 下面例子里，我们定义了StringArray接口，它具有索引签名。 
 * 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值。
 */
 interface StringArray {
    [index: number]: string; //索引签名
  }
  
  let myArray: StringArray;
  myArray = ["Bob", "Fred"];
  
  let myStr: string = myArray[0]

  interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    name: number       // 错误，`name`的类型与索引类型返回值的类型不匹配
  }


