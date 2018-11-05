import * as React from 'react';
import NumberButton from './NumberButton';
import OperationButton from './OperationButton';

interface State {
    calResult : number;
    tmpValue : number;
    memoryOper : string;
}

class CalculatorBody extends React.Component<{}, State> {
    constructor(props : any){
        super(props);
        this.state = { calResult : 0, tmpValue : 0, memoryOper : '' };
    }

    public handleClickNumber(num : number) : void {
        const { tmpValue } = this.state;
        let tmpNumber : string = tmpValue.toString();
        tmpNumber = tmpNumber + num.toString();
        this.setState({
            tmpValue : Number(tmpNumber)
        });
    }

    public handleClickOperation(oper : string) : void {
        const { tmpValue, calResult, memoryOper } = this.state;
        if(oper === 'C'){
            this.setState({
                calResult : 0,
                memoryOper : '',
                tmpValue : 0
            });
        } else {
            if(memoryOper !== ''){
                let result : number = 0;
                switch(memoryOper){
                    case '+' :
                        result = calResult + tmpValue;
                        break;
                    case '-' :
                        result = calResult - tmpValue;
                        break;
                    case '*' :
                        result = calResult * tmpValue;
                        break;
                    case '/' :
                        result = Math.floor(calResult / tmpValue);
                        break;
                    case '%' :
                        result = calResult % tmpValue;
                        break;
                }
                this.setState({
                    calResult : result,
                    memoryOper : '=',
                    tmpValue : 0,
                });
            } else {
                this.setState({
                    calResult : tmpValue,
                    memoryOper : oper,
                    tmpValue : 0
                });
            }
        }
    }

    public render() {
        const { calResult, tmpValue, memoryOper } = this.state;
        const numArray : number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        const operArray : string[] = ['+', '-', '*', '/', '%', '=', 'C'];
        return(
            <div>
                <h1>계산기 만들기</h1>
                <hr/>
                <h2>누적 계산 값</h2>
                <h2>{ calResult }</h2>
                <h2>현재 입력 값</h2>
                <h2>{ tmpValue }</h2>
                {
                    numArray.map((value : number) => <NumberButton num={value} key={`num_${value}`} btnAction={() => this.handleClickNumber(value)} />)
                }
                <br/>
                {
                    operArray.filter((value : string) => 
                        memoryOper === '' ? true : 
                            memoryOper === '=' ? 
                                value === 'C' : (value === '=' || value === 'C')
                    ).map((value : string, idx : number) => (
                        <OperationButton oper={value} key={`oper_${idx}`} btnAction={() => this.handleClickOperation(value)} />
                    ))
                }
            </div>
        )
    }
}

export default CalculatorBody;