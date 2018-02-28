import React from 'react';
import { Tooltip, Button } from 'material-ui';

export default class ArticleNewAction extends React.Component {

    shouldComponentUpdate(nextProps) {
        if(this.props.buttons !== nextProps.buttons ||
        this.props.div !== nextProps.div ) {
            return true
        }

        return false;
    }

    render() {
        const { div, buttons } = this.props;
        return (
            <div className={div}>
                <Tooltip title="Save without publishing">
                    <Button
                        variant="raised"
                        className={buttons}
                        name="save"
                        type="submit"
                    >
                        Save
                    </Button>
                </Tooltip>
                <Tooltip title="Save and publish">
                    <Button
                        variant="raised"
                        color="primary"
                        className={buttons}
                        name="publish"
                        type="submit"
                    >
                        Publish
                    </Button>
                </Tooltip>
            </div>
        )
    }
}