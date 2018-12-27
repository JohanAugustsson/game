import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import PermIdentity from '@material-ui/icons/PermIdentity';

const styles = theme => ({
  root: {
    margin: '20px',
    width: '100%',
    maxWidth: 500,
    maxHeight: '500px',
    overflow: 'auto',
    overflowX: 'hidden',
    borderRadius: '5px',
    backgroundColor: theme.palette.background.paper,
  },
});

class CheckboxListSecondary extends React.Component {
  handleToggle = uid => () => {
    const { value, formkey } = this.props;
    const currentIndex = value.indexOf(uid);
    const newChecked = [...value];

    if (currentIndex === -1) {
      newChecked.push(uid);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.props.onChange({target: {value: newChecked}}, formkey)
  };

  render() {
    const { classes, data, value } = this.props;
    return (
      <List dense className={classes.root}>
        {Object.values(data).map(item => (
          <ListItem key={item.uid} button onClick={this.handleToggle(item.uid)}>
            <ListItemIcon>
              <PermIdentity />
            </ListItemIcon>
            <ListItemText primary={`${item.firstName} ${item.lastName} - ${item.email}`} />
            <ListItemSecondaryAction>
              <Checkbox
                onChange={this.handleToggle(item.uid)}
                checked={value.indexOf(item.uid) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);
