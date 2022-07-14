import React from "react";
import { create } from 'ipfs-http-client'
import Web3 from "web3";
import config from "../../contract/config";
import { connect } from 'react-redux';

class Content extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            content: "",
            contact: "",
            depositAmount: 0
        };

        this.sendEmail = this.sendEmail.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    sendEmail() {

        console.log(this.state.content);
        console.log(this.state.contact);

        var params = {content: this.state.content, contact: this.state.contact};
        var url = new URL('https://torrectotest.herokuapp.com/mailTo');
        url.search = new URLSearchParams(params).toString();
        
        fetch(url).then().catch(e=>{});        
    }

    onChangeValue(event, type) {
        var value = event.target.value;
        if (type === "content") {
            this.setState({content:value});
        } else if (type === "contact") {
            this.setState({contact:value});
        } else if (type === "deposit") {
            this.setState({depositAmount:value});
        }
    }

    setValue(type) {

        if (type === "deposit") {
            this.props.dispatch({ type: "DEPOSIT_MONEY", payload: { type: type, value: this.state.depositAmount } });
        } else if (type === "withdraw"){
            this.props.dispatch({ type: "WITHDRAW_MONEY"});
        }
    }

    // console.log(this.props);

    render() {
        return (
            <>
                <section id="section-started" className="admin c-w flex flex-col align-center" style={{ height: "500px", padding: "30px" }}>
                    <span className="subtitle" data-nsfw-filter-status="swf"> Only owners can widthdraw money from Purse.</span>

                    <div id="started-content" className="flex mx-auto m-t-40 started-content-admin" style={{ justifyContent: "space-around" }}>
                        {/* <div className="c-yellow fs-30" style={{ marginTop: "10px" }}>{ this.state.contractBalance }</div> */}
                        <div className="c-yellow fs-30" style={{ marginTop: "10px" }}>PurseBalance {this.props.contractBalance} ETH</div>
                    </div>
                    <div className="m-t-20 admin-input-item" >
                        <button className="btn action-btn outline admin-setting-btn" onClick={() => { this.setValue("withdraw") }}>Withdraw</button>
                    </div>                    

                    <div className="m-t-40 admin-input-item" >
                        <label className="admin-input-label align-center">Mail To SupportTeam(humanbright529@gmail.com) </label>                        
                        <textarea type="text" className="form-contral admin-input-content wfull h-80" 
                            value={this.state.content || ""} 
                            onChange={(event) => { this.onChangeValue(event, "content") }}/>
                        <label className="admin-input-label align-center">Your Email </label>
                        <input type="text" className="form-contral admin-input-content wfull" 
                            value={this.state.contact || ""} 
                            onChange={(event) => { this.onChangeValue(event, "contact") }}/>
                    
                        <button className="m-t-20 btn action-btn outline align-center" onClick={this.sendEmail.bind()}>Send Email</button>                            
                    </div>
                    <div className="m-t-40">
                        <div className="admin-input-item">
                            <label className="admin-input-label">Claim Fee (AVAX): </label>
                            <div className="flex align-center">
                                <input type="number" className="form-contral admin-input-content" min={0} value={this.state.depositAmount || 0}
                                    onChange={(event) => { this.onChangeValue(event, "deposit") }} />
                                <button className="btn action-btn outline admin-setting-btn" onClick={() => { this.setValue("deposit") }}>DEPOSIT</button>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        contractBalance: state.contractBalance,
        depositAmount: state.depositAmount,
    };
}

const mapDispatchToProps = dispatch => {

    return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);