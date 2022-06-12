import React from "react";
import { Link, Navigate } from "react-router-dom";
import CommonValidations from "./common-validations";
import Persistence from "./persistence";

class AddNewGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                game_name: {
                    value: '', error: '', validations: [CommonValidations.mustBeString, CommonValidations.requried]
                },
                owner: {
                    value: '', error: '', validations: [CommonValidations.mustBeMail, CommonValidations.mustBeString, CommonValidations.requried]
                },
                bundle: {
                    value: '', error: '', validations: [
                        {
                            rule: value => /^([A-Za-z]{1}[A-Za-z\d_]*\.)+[A-Za-z][A-Za-z\d_]*$/.test(value),    // special rule defining
                            errMsg: 'Not matching as expected!'
                        },
                        CommonValidations.mustBeString, CommonValidations.requried
                    ]
                },
                icon_file: { value: '', error: 'initial-state' }
            },

            navigateToList: false
        }
    }

    handleClickSave = e => {
        e.preventDefault();
        if (!this.isFormValid()) {
            window.toastr.error("The form is not valid!", 'Failed');
            return false;
        }

        Persistence().addToList({
            game_name: this.state.fields.game_name.value,
            bundle: this.state.fields.bundle.value,
            owner: this.state.fields.owner.value,
            icon_file: this.state.fields.icon_file.value
        });

        window.toastr.success('A new game has been addedd successfully!', 'Successfull');
        this.setState({ navigateToList: true });
    }

    handleBlurField = e => {
        const fieldName = e.target.getAttribute('data-id');
        let errMsg = '';
        this.state.fields[fieldName].validations?.forEach(validation => {
            if (!validation.rule(e.target.value)) {
                errMsg = validation.errMsg;
            }
        });
        this.setState(prevState => {
            prevState.fields[fieldName].error = errMsg;
            return prevState;
        })
    }

    handleChangeField = e => {
        const fieldName = e.target.getAttribute('data-id');
        this.setState(prevState => {
            prevState.fields[fieldName].value = e.target.value;
            return prevState;
        });
    }

    handleChangeIcon = e => {
        const pathArr = e.target?.value?.split('\\');
        const fileName = pathArr[pathArr.length - 1];
        this.setState(prevState => {
            prevState.fields.icon_file.value = fileName;
            prevState.fields.icon_file.error = '';
            return prevState;
        })
    }

    isFormValid = () => {
        const fields = Object.entries(this.state.fields).map(field => field[1]);
        return fields.every(field => field.value) &&
            fields.every(field => field.error === '')
    }

    render() {
        if (this.state.navigateToList)
            return <Navigate to="/" push />

        return (
            <section id="add-new-game">
                <Link to="/" className="link"><i className="fa-solid fa-angle-left"></i> Back to list</Link>
                <hr />
                <form>
                    <h3 className="form-title">Form Title</h3>
                    <div className="form-group">
                        <input type="text" className={this.state.fields.game_name.error && 'invalid'} placeholder="Game Name" onBlur={this.handleBlurField} onChange={this.handleChangeField} value={this.state.fields.game_name.value} data-id="game_name" />
                        {this.state.fields.game_name.error && <div className="form-help-block">{this.state.fields.game_name.error}</div>}
                    </div>
                    <div className="form-group">
                        <input type="text" className={this.state.fields.bundle.error && 'invalid'} placeholder="Bundle" onBlur={this.handleBlurField} onChange={this.handleChangeField} value={this.state.fields.bundle.value} data-id="bundle" />
                        {this.state.fields.bundle.error && <div className="form-help-block">{this.state.fields.bundle.error}</div>}
                    </div>
                    <div className="form-group">
                        <input type="text" className={this.state.fields.owner.error && 'invalid'} placeholder="Owner" onBlur={this.handleBlurField} onChange={this.handleChangeField} value={this.state.fields.owner.value} data-id="owner" />
                        {this.state.fields.owner.error && <div className="form-help-block">{this.state.fields.owner.error}</div>}
                    </div>
                    <div className="form-group">
                        <input type="file" onChange={this.handleChangeIcon} accept="image/*" />
                    </div>
                    <div className="form-buttons">
                        <button className="btn btn-secondary" onClick={this.handleClickSave}>Save</button>
                    </div>
                </form>
            </section >
        );
    }
}

export default AddNewGame;