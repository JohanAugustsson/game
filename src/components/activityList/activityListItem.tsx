import {Divider, Grid, ListItem} from "@material-ui/core";
import React from "react";
import {getDateFromTimestamp} from "../../core/momentHelper";

interface Props {
    activity: any;
    username: string;
}

export const ActivityListItem: React.FC<Props> = (props) => {
    const {activity, username} = props;
    return (<div>
        <Divider/>
        <ListItem>
            <Grid item={true} xs={true} container={true} direction={"row"}>
                <Grid
                    style={{textAlign: "left"}}
                    item={true}
                    xs={2}
                    sm={2}
                    className={"grid-flex-center"}
                >
                    <span>{username}</span>
                </Grid>
                <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                    <span>{activity.value}</span>
                </Grid>
                <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                    <span>{activity.team}</span>
                </Grid>
                <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                    <span>{activity.type}</span>
                </Grid>
                <Grid
                    style={{textAlign: "right"}}
                    item={true}
                    xs={4}
                    sm={4}
                    className={"grid-flex-center"}
                >
                    {getDateFromTimestamp(activity.createdAt)}
                </Grid>
            </Grid>
        </ListItem>
    </div>);
};

export default ActivityListItem;
