# Carbon API for Snipp-it Snippets

Simple api that generates an image of snippet by automating [https://carbon.now.sh/](https://carbon.now.sh/) using [puppeteer](https://github.com/puppeteer/puppeteer).

### Send `POST` request using the following params

| Parameter              | Default                    | Type    | Description                                      |
| ---------------------- | -------------------------- | ------- | ------------------------------------------------ |
| `code` (required)      |                            | string  | Code snippet                                     |
| `backgroundColor`      | `"rgba(171, 184, 195, 1)"` | string  | Hex or rgba color                                |
| `dropShadow`           | `true`                     | boolean | Turn on/off shadow                               |
| `dropShadowBlurRadius` | `"68px"`                   | string  | shadow blur radius                               |
| `dropShadowOffsetY`    | `"20px"`                   | string  | shadow offset y                                  |
| `exportSize`           | `"2x"`                     | string  | resolution of exported image, e.g. `1x`, `3x`    |
| `fontSize`             | `"14px"`                   | string  | font size                                        |
| `fontFamily`           | `"Hack"`                   | string  | font family, e.g. `JetBrains Mono`, `Fira Code`. |
| `firstLineNumber`      | `1`                        | number  | first line number                                |
| `language`             | `"auto"`                   | string  | programing language for properly highlighting    |
| `lineNumbers`          | `false`                    | boolean | turn on/off line number                          |
| `paddingHorizontal`    | `"56px"`                   | string  | horizontal padding                               |
| `paddingVertical`      | `"56px"`                   | string  | vertical padding                                 |
| `theme`                | `"seti"`                   | string  | code theme                                       |
| `watermark`            | `false`                    | boolean | turn on/off watermark                            |
| `widthAdjustment`      | `true`                     | boolean | turn on/off width adjustment                     |
| `windowControls`       | `true`                     | boolean | turn on/off window controls                      |
| `windowTheme`          | `"none"`                   | string  | window theme                                     |

### Body

`code` should be URI encoded. You can use the built-in [javascript api](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) `encodeURI(uri)`

```json
{
	"backgroundColor": "FFC0CB",
	"code": "function%20hexToRgb(hex:%20string):%20string%20%7B%0A%09if%20(hex.length%20!=%206)%20%7B%0A%09%09throw%20new%20Error('Only%20six-digit%20hex%20colors%20are%20allowed');%0A%09%7D%0A%0A%09let%20aRgbHex:%20any%20=%20hex.match(/.%7B1,2%7D/g);%0A%09let%20aRgb%20=%20%5B%0A%09%09parseInt(aRgbHex%5B0%5D,%2016),%0A%09%09parseInt(aRgbHex%5B1%5D,%2016),%0A%09%09parseInt(aRgbHex%5B2%5D,%2016)%0A%09%5D;%0A%0A%09return%20%60rgba($%7BaRgb%5B0%5D%7D,%20$%7BaRgb%5B1%5D%7D,%20$%7BaRgb%5B2%5D%7D)%60;%0A%7D",
	"theme": "base16-light"
}
```

### Response

Image

![snippet](/public/example.png)

Path

> Todo
