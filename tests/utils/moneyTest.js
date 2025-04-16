import { formatCurrency } from "../../scripts/utils/money.js";
describe('test suite:format currency',()=>{
  it('Converts cents into dollars',()=>{
    expect(formatCurrency(2045)).toEqual('20.45');
  });
  it('works with 0',()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });
  it('rounds up to the nearst cent',()=>{
    expect(formatCurrency(2045.5)).toEqual('20.46');
  });
  it('rounds down to nearst cent',()=>{
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
  it('checks negative number',()=>{
    expect(formatCurrency(-200)).toEqual('-2.00');
  });
});