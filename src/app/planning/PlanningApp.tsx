import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Box, Grommet, Grid, Button, Heading, CheckBox, ResponsiveContext, Paragraph } from "grommet";
import Todolist from "../../todolist";
import theme from "../styles/theme";

let tasks = ['Watch Lecture', 'Review Chris PR', 'Prepare for Interviews', 'Make presentation slides'];

interface Event {
    'title': string,
    'time': string
}

interface DateSchedule {
    'date': string,
    'events': Event[]
}

let events: DateSchedule[] = [
    {
        'date': 'Mon, 31 Aug 2020',
        'events': [
            {
                'title': 'Sprint Planning',
                'time': '10.00am - 11.00am'
            },
            {
                'title': 'Design Layout Review',
                'time': '11.30am - 12.30pm'
            }
        ]
    },
    {
        'date': 'Tue, 01 Sep 2020',
        'events': [
            {
                'title': 'Sprint Planning',
                'time': '10.00am - 11.00am'
            },
            {
                'title': 'Design Layout Review',
                'time': '11.30am - 12.30pm'
            }
        ]
    },
    {
        'date': 'Wed, 02 Sep 2020',
        'events': [
            {
                'title': 'Sprint Planning',
                'time': '10.00am - 11.00am'
            }
        ]
    },
    {
        'date': 'Thu, 03 Sep 2020',
        'events': []
    },
    {
        'date': 'Fri, 04 Sep 2020',
        'events': [
            {
                'title': 'Sprint Planning',
                'time': '10.00am - 11.00am'
            },
            {
                'title': 'Design Layout Review',
                'time': '11.30am - 12.30pm'
            }
        ]
    },
]

const ToDoItem = (task: string) => {
    const [checked, setChecked] = React.useState(false);
    
    return (<Box pad='small' margin='xsmall' background='dark-2'>
        <CheckBox
            name={task + '-todo-item'}
            checked={checked}
            label={task}
            onChange={(event) => setChecked(event.target.checked)}
        />
    </Box>);
};

const DateList = (dateSchedule: DateSchedule) => {
    return (
        <Box margin='small'>
            <Box border='bottom'>
                <Heading level={4} margin='none' color='dark-2'>
                    {dateSchedule.date}
                </Heading>
            </Box>
            {dateSchedule.events.map(event => (
                <Box background='brand' margin="xsmall">
                    <Heading level={5} margin='xsmall'>{event.title}</Heading>
                    <Paragraph size='small' margin='xsmall'>{event.time}</Paragraph>
                </Box>  
            ))}
        </Box>
    )
}

const PlanningApp = () => {
  return (
    <Grommet theme={theme}>
        <Box justify='center' align='center'>
            <Grid
                rows={['xsmall', 'auto']}
                columns={['1/2', '1/4', '1/4']}
                gap='medium'
                areas={[
                    { name: 'header', start: [0, 0], end: [2, 0] },
                    { name: 'calendar', start: [0, 1], end: [0, 1] },
                    { name: 'yesterday', start: [1, 1], end: [1, 1] },
                    { name: 'tomorrow', start: [2, 1], end: [2, 1] },
                ]}
            >
                <Box gridArea="header" background="brand" justify='center'>
                    <Heading margin='medium'>Plan Your Day</Heading>
                </Box>
                <Box gridArea="calendar" background="light-5" pad='medium'>
                    <Heading level={3} margin='none' color="#000">Weekly Schedule</Heading>
                    {events.map(dateSchedule => DateList(dateSchedule))}
                </Box>
                <Box gridArea="yesterday" background="light-2" pad='medium'>
                    <Heading level={3} margin='none' color="#000">Yesterday</Heading>
                    {tasks.map(task => ToDoItem(task))}
                </Box>
                <Box gridArea="tomorrow" background="light-2" pad='medium'>
                    <Heading level={3} margin='none' color="#000">Today</Heading>
                    <Todolist />
                </Box>
            </Grid>
            <Button primary label="Start Your Day" size="large" margin={{'top': '50px'}} />
        </Box>
    </Grommet>
  );
};

export default PlanningApp;
