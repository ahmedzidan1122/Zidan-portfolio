"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  LogOut,
  User,
  Briefcase,
  Code2,
  Image as ImageIcon,
  Link,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import type { SiteData } from "@/lib/types";
import { defaultData } from "@/lib/defaultData";

interface AuthState {
  token: string;
  password: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [data, setData] = useState<SiteData>(defaultData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  const ADMIN_SECRET = "admin-secret-123";

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_token");
    if (stored) {
      setAuth({ token: stored, password: "" });
      loadData(stored);
    }
  }, []);

  async function loadData(token: string) {
    try {
      const res = await fetch("/api/data", {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // Use default
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });

      if (res.ok) {
        const json = await res.json();
        const token = json.token;
        sessionStorage.setItem("admin_token", token);
        setAuth({ token, password: passwordInput });
        loadData(token);
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Connection error");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_token");
    setAuth(null);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${ADMIN_SECRET}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        setError("Failed to save");
      }
    } catch {
      setError("Connection error");
    } finally {
      setSaving(false);
    }
  }

  function updateData(path: string, value: unknown) {
    setData((prev) => {
      const clone = { ...prev };
      const keys = path.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = clone;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return clone;
    });
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm glass rounded-2xl p-8"
        >
          <div className="flex items-center justify-center mb-6">
            <Shield size={32} className="text-accent-blue" />
          </div>
          <h1 className="text-xl font-bold text-center text-text-primary mb-6">
            Admin Access
          </h1>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-blue/50 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full gradient-button rounded-xl py-3 text-sm font-medium text-white"
          >
            Sign In
          </button>

          <p className="text-xs text-text-tertiary text-center mt-4">
            Default password: admin123
          </p>
        </form>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: ImageIcon },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <h1 className="text-sm font-bold gradient-text">Admin Dashboard</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1.5 gradient-button rounded-lg px-4 py-1.5 text-xs font-medium text-white disabled:opacity-50"
              >
                <Save size={14} />
                {saving ? "Saving..." : saved ? "Saved!" : "Save"}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-text-tertiary hover:text-red-400 transition-colors text-xs"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <div className="hidden md:flex flex-col gap-1 w-48 shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-accent-blue/10 text-accent-blue"
                      : "text-text-tertiary hover:text-text-secondary hover:bg-glass-bg"
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex-1 min-w-0">
            {activeTab === "profile" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Profile Settings
                </h2>

                <Field label="Name">
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => updateData("name", e.target.value)}
                    className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-blue/50"
                  />
                </Field>

                <Field label="Title (use \n for line break)">
                  <textarea
                    value={data.title}
                    onChange={(e) => updateData("title", e.target.value)}
                    rows={3}
                    className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-blue/50 resize-none"
                  />
                </Field>

                <Field label="Hero Description">
                  <textarea
                    value={data.heroDescription}
                    onChange={(e) => updateData("heroDescription", e.target.value)}
                    rows={3}
                    className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-blue/50 resize-none"
                  />
                </Field>

                <Field label="Profile Image URL">
                  <input
                    type="text"
                    value={data.profileImage}
                    onChange={(e) => updateData("profileImage", e.target.value)}
                    className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-blue/50"
                  />
                </Field>

                <Field label="Resume URL">
                  <input
                    type="text"
                    value={data.resumeUrl}
                    onChange={(e) => updateData("resumeUrl", e.target.value)}
                    className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-blue/50"
                  />
                </Field>
              </div>
            )}

            {activeTab === "about" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  About Section
                </h2>

                {data.aboutDescription.map((paragraph, i) => (
                  <Field key={i} label={`Paragraph ${i + 1}`}>
                    <textarea
                      value={paragraph}
                      onChange={(e) => {
                        const updated = [...data.aboutDescription];
                        updated[i] = e.target.value;
                        updateData("aboutDescription", updated);
                      }}
                      rows={3}
                      className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-blue/50 resize-none"
                    />
                  </Field>
                ))}
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Skills
                </h2>

                {data.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="glass rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Code2 size={16} className="text-accent-cyan" />
                      <span className="text-sm text-text-primary">
                        {skill.name}
                      </span>
                      <span className="text-[10px] uppercase text-text-tertiary bg-glass-bg px-2 py-0.5 rounded-full">
                        {skill.category}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const updated = data.skills.filter((_, idx) => idx !== i);
                        updateData("skills", updated);
                      }}
                      className="text-red-400/50 hover:text-red-400 text-xs transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "experience" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Experience
                </h2>

                {data.experience.map((exp, i) => (
                  <div key={exp.id} className="glass rounded-xl p-5 space-y-3">
                    <Field label="Title">
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[i] = { ...updated[i], title: e.target.value };
                          updateData("experience", updated);
                        }}
                        className="w-full bg-bg-primary border border-glass-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50"
                      />
                    </Field>
                    <Field label="Company">
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[i] = { ...updated[i], company: e.target.value };
                          updateData("experience", updated);
                        }}
                        className="w-full bg-bg-primary border border-glass-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50"
                      />
                    </Field>
                    <Field label="Period">
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[i] = { ...updated[i], period: e.target.value };
                          updateData("experience", updated);
                        }}
                        className="w-full bg-bg-primary border border-glass-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50"
                      />
                    </Field>
                    <Field label="Description">
                      <textarea
                        value={exp.description}
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[i] = {
                            ...updated[i],
                            description: e.target.value,
                          };
                          updateData("experience", updated);
                        }}
                        rows={2}
                        className="w-full bg-bg-primary border border-glass-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50 resize-none"
                      />
                    </Field>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Projects
                </h2>

                {data.projects.map((project, i) => (
                  <div key={project.id} className="glass rounded-xl p-5 space-y-3">
                    <Field label="Title">
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[i] = { ...updated[i], title: e.target.value };
                          updateData("projects", updated);
                        }}
                        className="w-full bg-bg-primary border border-glass-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50"
                      />
                    </Field>
                    <Field label="Description">
                      <textarea
                        value={project.description}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[i] = {
                            ...updated[i],
                            description: e.target.value,
                          };
                          updateData("projects", updated);
                        }}
                        rows={2}
                        className="w-full bg-bg-primary border border-glass-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50 resize-none"
                      />
                    </Field>
                    <Field label="Image URL">
                      <input
                        type="text"
                        value={project.image}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[i] = { ...updated[i], image: e.target.value };
                          updateData("projects", updated);
                        }}
                        className="w-full bg-bg-primary border border-glass-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50"
                      />
                    </Field>
                    <Field label="Live URL">
                      <input
                        type="text"
                        value={project.liveUrl || ""}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[i] = { ...updated[i], liveUrl: e.target.value };
                          updateData("projects", updated);
                        }}
                        className="w-full bg-bg-primary border border-glass-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50"
                      />
                    </Field>
                    <Field label="Tags (comma separated)">
                      <input
                        type="text"
                        value={project.tags.join(", ")}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[i] = {
                            ...updated[i],
                            tags: e.target.value.split(",").map((t) => t.trim()),
                          };
                          updateData("projects", updated);
                        }}
                        className="w-full bg-bg-primary border border-glass-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50"
                      />
                    </Field>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Contact Information
                </h2>

                <Field label="Email">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-text-tertiary shrink-0" />
                    <input
                      type="email"
                      value={data.contact.email}
                      onChange={(e) =>
                        updateData("contact.email", e.target.value)
                      }
                      className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50"
                    />
                  </div>
                </Field>

                <Field label="Phone">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-text-tertiary shrink-0" />
                    <input
                      type="text"
                      value={data.contact.phone}
                      onChange={(e) =>
                        updateData("contact.phone", e.target.value)
                      }
                      className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50"
                    />
                  </div>
                </Field>

                <Field label="WhatsApp URL">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={14} className="text-text-tertiary shrink-0" />
                    <input
                      type="text"
                      value={data.contact.whatsapp}
                      onChange={(e) =>
                        updateData("contact.whatsapp", e.target.value)
                      }
                      className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50"
                    />
                  </div>
                </Field>

                <Field label="Location">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-text-tertiary shrink-0" />
                    <input
                      type="text"
                      value={data.contact.location}
                      onChange={(e) =>
                        updateData("contact.location", e.target.value)
                      }
                      className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50"
                    />
                  </div>
                </Field>

                <Field label="Instagram URL">
                  <div className="flex items-center gap-2">
                    <Link size={14} className="text-text-tertiary shrink-0" />
                    <input
                      type="text"
                      value={data.social.instagram}
                      onChange={(e) =>
                        updateData("social.instagram", e.target.value)
                      }
                      className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50"
                    />
                  </div>
                </Field>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 gradient-button rounded-xl px-6 py-3 text-sm font-medium text-white disabled:opacity-50"
              >
                <Save size={16} />
                {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-primary/95 backdrop-blur-xl border-t border-glass-border z-50">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 text-[10px] font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "text-accent-blue"
                    : "text-text-tertiary"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs text-text-tertiary mb-1.5 font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
