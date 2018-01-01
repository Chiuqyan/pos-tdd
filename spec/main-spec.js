const main = require("../main/main");
const database = require("../main/datbase");

describe("splitcode", function() {
    let inputs;
    let answer;
    let result;
    it("input string contain - and split into two parts at -", function() {
        inputs = "ITEM000003-8";
        answer = ["ITEM000003", "8"];
        result = main.splitcode(inputs);
        expect(result).toEqual(answer);
    });

    it("input barcode have no - and then return its count witn 1", function() {
        inputs = "ITEM000002";
        answer = ["ITEM000002", 1];
        result = main.splitcode(inputs);

        expect(result).toEqual(answer);
    });
});

describe("count", function() {
    let inputs;
    let answer;
    let result;
    it("input array of items' barcodes return the items' information after discount", function() {
        inputs = [
            'ITEM000000-6',
            'ITEM000001-3',
            'ITEM000002',
            'ITEM000003-3',
        ];

        result = main.count(inputs);
        answer = [
            { barcode: 'ITEM000000', count: 6, name: "可口可乐", unit: "瓶", price: 3.00, total: 12.00 },
            { barcode: 'ITEM000001', count: 3, name: "雪碧", unit: "瓶", price: 3.00, total: 6.00 },
            { barcode: 'ITEM000002', count: 1, name: "苹果", unit: "斤", price: 5.50, total: 5.50 },
            { barcode: 'ITEM000003', count: 3, name: "荔枝", unit: "斤", price: 15.00, total: 45.00 },
        ];

        expect(result).toEqual(answer);
    });
});



describe('pos', function() {
    var allItems;
    var inputs;

    beforeEach(function() {
        allItems = database.loadAllItems();
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it('should print correct text', function() {

        spyOn(console, 'log');

        main.printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});