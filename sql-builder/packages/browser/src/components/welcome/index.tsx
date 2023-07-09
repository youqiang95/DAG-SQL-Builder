import React from 'react';
import { prefixClaName } from '@dtinsight/molecule/esm/common/className';
import './index.less'

export default function Welcome() {
    return (
        <div className={prefixClaName('welcome')}>
            {/* <div className="logo">
                <img className='logo-img' src='SQLHelper.png'></img>
            </div>
            <h1 className="welcome-title">SQL助手</h1>
            <h1 className="welcome-title">让数据开发更简单</h1> */}
        </div>
    )
}