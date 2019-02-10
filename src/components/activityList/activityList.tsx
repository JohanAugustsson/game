import {Grid, List, Paper, Typography} from "@material-ui/core";
import React from "react";
import {Activity} from "../../core/model/activity";
import {InterfaceHash} from "../../core/model/iHash";
import {sortByChronologicalOrder} from "../../core/sorting";
import ActivityListItem from "./activityListItem";
import {User} from "../../core/model/users";

interface Props {
    activities: InterfaceHash<Activity>;
    users: InterfaceHash<User>;
}

export const ActivityList: React.FC<Props> = (props) => {
    const {activities, users} = props;
    return (<Grid container={true}>
            <Grid item={true} xs={12} sm={12}>
                <Typography variant={"headline"}/>
            </Grid>
            <Grid item={true} xs={12} sm={12}>
                <Paper className={"paper"}>
                    <Typography>Activities in game</Typography>
                    <Grid item={true} xs={true} container={true} direction={"row"}>
                        <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                            <span>Name</span>
                        </Grid>
                        <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                            <span>Value</span>
                        </Grid>
                        <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                            Team
                        </Grid>
                        <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                            <span>Type</span>
                        </Grid>
                        <Grid item={true} xs={4} sm={4} className={"grid-flex-center"}>
                            Date
                        </Grid>
                    </Grid>
                    <List style={{maxHeight: 300, overflow: "auto"}}>
                        {sortByChronologicalOrder(activities).map((activity, i: number) =>
                            <ActivityListItem
                                key={i}
                                activity={activity}
                                username={users[activity.userUid].firstName}
                            />)}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ActivityList;
