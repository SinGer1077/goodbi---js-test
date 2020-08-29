import React, {useEffect,useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader"


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBackground: {
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 2),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

    cardPage: {
        maxWidth: 500
    },

    formPage: {
        margin: theme.spacing(1),
    },

    formInput:{
        width: '100%'
    }
}));


function App() { //здесь мы используем хуки, так как нет возможности работать с классом
    const classes = useStyles();
    const [name,setName] = useState(''); //хук состояния, фиксирующий текущую введенную строку
    const [fullName,setFullName] = useState(''); //хук состояния, фиксирующий то что должно быть отправлено в итоге
    const [sex, setSex] = useState(''); //хук состояния, фиксирующий полученный гендер имени
    const [genderText,setText] = useState('Неопределён'); //хук состояния, определяющий надпись на карточке
    const [card, setCard] = useState(true); //хук состояния, отвечающий за появление карточки
    const updateName = e => { //фиксация введенной строки
        setName(e.target.value);
    }
    const getName = e =>{ //фиксация итоговой строки
        e.preventDefault();
        setFullName(name);
        setCard(false);
    }
    useEffect(()=>{ //хук эффекта, срабатывающий при фиксации итоговой строки
        getInput(); //вызов функции для обращения к  api
        }, [fullName, sex]);
    const getGender = gender =>{ //установка гендера
        setSex(gender);
    }
    const getInput = async () => { //обращение к api
        const response = await fetch(
            'https://api.genderize.io?name='+fullName //обращение к адресу с именем
        );
        const data = await response.json(); //перевод в json формат
        getGender(data.gender); //обращение к полю gender
        if (sex=='male') //определение пола и установка надписи на карточке
            setText('Мужчина')
        if (sex=='female')
            setText('Женщина')
        if (sex==null)
            setText('Неопределён')
    };

    return (
        <div className={classes.appBackground}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Узнай пол по имени
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.drawerHeader}/>
                <Container>
                    <Card className={classes.cardPage}>
                        <form className={classes.formPage} noValidate autoComplete="off">
                            <CardContent>
                                <TextField className={classes.formInput} id="filled-basic"
                                           label="Введи свое транслитерированое имя (Латиницей)" variant="filled"
                                onChange = {updateName}/>
                            </CardContent>
                            <CardActions>
                                <Button onClick={getName} variant="contained" color="primary">
                                    Узнать пол
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Container>
                <div className={classes.drawerHeader}/>
                <Container className={classes.root} >
                    <Card className={classes.cardPage} hidden={card}>
                        <CardContent>
                            <CardHeader title={genderText}/>
                        </CardContent>
                    </Card>
                </Container>

            </main>
        </div>
    );
}

export default App;
