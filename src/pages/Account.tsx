import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../contexts";
import { supabase, getUser } from "../supabaseClient";

interface Profile {
  name: string;
  surname: string;
  avatarUrl: string;
}

export function Account() {
  const history = useHistory();
  const session: any = useContext(SessionContext);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = getUser();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`name, surname, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setName(data.name);
        setSurname(data.surname);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error: any) {
      alert("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ name, surname, avatarUrl }: Profile) {
    try {
      setLoading(true);
      const user = getUser();

      const updates = {
        id: user.id,
        name,
        surname,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      alert(`Something went wrong updating the profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
      history.push("/login");
    } catch (e) {
      alert("Someting went wrong logging out: " + e);
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={session?.user?.email ?? ""}
          disabled
        />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="surname">Surname</label>
        <input
          id="surname"
          type="text"
          value={surname || ""}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ name, surname, avatarUrl })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => logout()}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
