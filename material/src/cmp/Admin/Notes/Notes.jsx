import {
  Grid,
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from "@mui/material";
import {
  useState,
  useEffect,
  useRef
} from "react"
import "./Notes.css";
import JoditEditor from "jodit-react";
import {
  createNoteRequest,
  viewNoteRequest,
  deleteRequest
} from "./Notes.action";
import {
  useDispatch,
  useSelector
} from "react-redux";

const Notes = ()=>{
  const [saveInput,setSaveInput] = useState(false);
  const [note,setNote] = useState('');
  const [fileName,setFileName] = useState('');
  const dispatch = useDispatch();
  const {NotesReducer} = useSelector(response=>response);

  const newFile = ()=>{
    return (
      setFileName(''),
      setNote(''),
      setSaveInput(false)
    )
  }

  const checkForCreatedNote = useRef();
  checkForCreatedNote.current = ()=>{
    if(NotesReducer.createSuccess)
    {
      newFile();
    }
  }

  const checkForDeletedNote = useRef();
  checkForDeletedNote.current = ()=>{
    if(NotesReducer.deleteSuccess)
    {
      newFile();
    }
  }

  const listFile = useRef();
  listFile.current = ()=>{
    if(NotesReducer.viewSuccess === null)
    {
      return dispatch(viewNoteRequest());
    }
  }

  useEffect(()=>{
    checkForCreatedNote.current();
    listFile.current();
    checkForDeletedNote.current();
  },[NotesReducer]);
  const saveFile = ()=>{
    const user = sessionStorage.getItem("user");
    let {userId} = JSON.parse(user);

    const formData = {
      filename: fileName,
      content: note,
      userId: userId
    }
    dispatch(createNoteRequest(formData));
  }

  const readFile = (content)=>{
    return setNote(content);
  }

  const NotesList = ({data})=>{
    const tmp = (
      <>
        <ListItemButton className="w-100">
          <ListItemText primary={data.filename} onClick={()=>readFile(data.content)} />
          <IconButton color="error" onClick={()=>dispatch(deleteRequest(data))}>
            <span className="material-icons-outlined">delete</span>
          </IconButton>
        </ListItemButton>
      </>
    );
    return tmp;
  }

  const config = {
    height: "1200px",
    removeButtons: [
      "fullsize"
    ]
  }
  const design = (
    <>
      <div className="bg-white shadow-sm" style={{borderRadius:"10px"}}>
        <Grid container>
          <Grid item xs={12} sm={3} className="p-3" sx={{
            height:{
              xs: "auto",
              sm: "1200px"
            },
            borderRight:"1px solid #f5f5f5"
          }}>
            <Button variant="outlined" className="py-2 px-4 mb-4" sx={{mr: 2}} onClick={newFile}>New File</Button>
            <Button onClick={()=>setSaveInput(!saveInput)} variant="outlined" className="py-2 px-4 mb-4" color="warning">Save File</Button>
            {
              saveInput ? <FormControl className="mb-4" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Filename</InputLabel>
                <OutlinedInput
                label="Filename"
                variant="outlined"
                name="filename"
                value={fileName}
                onChange={(e)=>setFileName(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={saveFile}>
                      <span className="material-icons-outlined">save</span>
                    </IconButton>
                  </InputAdornment>
                }
              />
              </FormControl> : null
            }
            <List subheader={<ListSubheader>Saved Files</ListSubheader>}>
              <ListItem sx={{py:0}} className="d-flex flex-column">
              {
                NotesReducer.data.map((item,index)=>{
                  item.index = index;
                  return <NotesList key={index} data={item} />
                })
              }
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={9}>
            <JoditEditor
            config={config}
            value={note}
            onBlur={(data)=>setNote(data)}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
  return design;
}

export default Notes;
