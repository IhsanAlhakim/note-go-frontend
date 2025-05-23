import { useState } from "react";
import NoteFormTextArea from "./NoteFormTextArea";
import NoteFormTextInput from "./NoteFormTextInput";
import { createNote } from "../../network/note_api";
import { useToast } from "../Toast";

interface newNoteDataBody {
  title: string;
  text: string;
}

export default function CreateNoteForm() {
  const newNoteDataDefaultValue = {
    title: "",
    text: "",
  };
  const [newNoteData, setNewNoteData] = useState<newNoteDataBody>(
    newNoteDataDefaultValue
  );

  const [loading, setLoading] = useState(false);
  const [showCreateNote, setShowCreateNote] = useState(false);

  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewNoteData({
      ...newNoteData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createNoteAPIResponse = await createNote({
        title: newNoteData.title,
        text: newNoteData.text,
      });

      const statusSuccessCreated = 201;

      if (createNoteAPIResponse.status != statusSuccessCreated) {
        throw new Error("Note not created successfully");
      }
      showToast("Note Created");
      setNewNoteData(newNoteDataDefaultValue);

      //   if (userLogin.status == 500) {
      //     throw new ServerError(
      //       "Something went wrong on our server. Please try again later"
      //     );
      //   }
      //   if (userLogin.status != 200) {
      //     throw new LoginError(userLogin.message);
      //   }
      //   setUserData(userDataDefaultValue);
      //   setLoggedInUser({
      //     username: userLogin.data.username,
      //     email: userLogin.data.email,
      //   });
      //   navigate("/");
    } catch (err) {
      console.log(err);
      showToast("Note not created successfully");
      //   if (
      //     err instanceof ValidationError ||
      //     err instanceof ServerError ||
      //     err instanceof LoginError
      //   ) {
      //     setError({ errorTitle: err.name, errorDesc: err.desc });
      //     return;
      //   }
      //   setError({
      //     errorTitle: "Server Unavailable",
      //     errorDesc: ["Server unavailable, please try again later"],
      //   });
    } finally {
      setShowCreateNote(!showCreateNote);
      setLoading(false);
    }
  };

  return (
    <div className="w-[600px] max-w-[600px] min-h-[50px] border-2 px-3 rounded-lg flex-co items-center">
      {showCreateNote ? (
        <form onSubmit={handleSubmit}>
          <NoteFormTextArea
            id="title"
            name="title"
            value={newNoteData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <NoteFormTextArea
            id="text"
            name="text"
            value={newNoteData.text}
            onChange={handleChange}
            placeholder="Take a note"
          />
          <div className="w-full h-[50px] flex px-1 items-center">
            <button
              disabled={loading}
              type="submit"
              className={`ml-auto  ${
                loading ? "bg-blue-300" : "bg-blue-500"
              } hover:bg-blue-500 w-[80px] h-[30px] rounded-lg font-semibold text-white`}
            >
              Close
            </button>
          </div>
        </form>
      ) : (
        <NoteFormTextInput onClick={() => setShowCreateNote(!showCreateNote)} />
      )}
    </div>
  );
}
