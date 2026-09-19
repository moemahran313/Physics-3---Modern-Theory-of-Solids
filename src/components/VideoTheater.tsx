import React, { useState } from "react";
import { VIDEO_THEATER_LECTURES } from "../lib/reflibData";
import { VideoLectureItem } from "../types";
import { 
  Tv, 
  Play, 
  ExternalLink, 
  Clock, 
  BookOpen, 
  Sparkles,
  ChevronRight 
} from "lucide-react";

export const VideoTheater: React.FC = () => {
  const [selectedLectureId, setSelectedLectureId] = useState<string>(VIDEO_THEATER_LECTURES[0].id);

  const activeLecture = VIDEO_THEATER_LECTURES.find(l => l.id === selectedLectureId) || VIDEO_THEATER_LECTURES[0];

  return (
    <div className="space-y-6">
      {/* Theater Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/40 via-slate-950 to-indigo-950/30 border border-red-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono text-xs border border-red-500/30 flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5 text-red-400" />
              <span>Physics 3 Video Theater</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">10 Official Department Lectures</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Comprehensive Video Dashboard & Lecture Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Stream full Modern Academy Physics 3 lectures with syllabus timestamps and key exam takeaways.
          </p>
        </div>

        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-xs shadow-lg shadow-red-600/30 transition-colors shrink-0"
        >
          <span>Open YouTube Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Video Player & Playlist Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Video Player & Active Lecture Summary */}
        <div className="lg:col-span-8 space-y-4">
          {/* Responsive 16:9 Video Container */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl relative">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeLecture.youtubeId}?autoplay=0&rel=0`}
              title={activeLecture.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Metadata Box */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-xs font-mono text-indigo-400 block">
                  {activeLecture.chapter}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {activeLecture.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs text-slate-400 font-mono px-2.5 py-1 rounded bg-slate-950 border border-slate-800">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{activeLecture.duration || "Full Lecture"}</span>
                </span>
                <a
                  href={activeLecture.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  title="Watch on YouTube in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeLecture.description}
            </p>

            {/* Topics Covered Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                Topics & Derivations Covered in this Lecture:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeLecture.topicsCovered.map((topic, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 cols: Lecture Playlist Navigator */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase font-mono tracking-wider text-slate-300">
                Curriculum Playlist
              </span>
              <span className="text-[10px] font-mono text-indigo-400">
                10 Videos Available
              </span>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {VIDEO_THEATER_LECTURES.map((lecture) => {
                const isCurrent = lecture.id === selectedLectureId;
                return (
                  <button
                    key={lecture.id}
                    onClick={() => setSelectedLectureId(lecture.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isCurrent
                        ? "bg-red-600/15 border-red-500/50 shadow-sm"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isCurrent ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"
                    }`}>
                      {lecture.lectureNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-slate-400 font-mono block truncate">
                        {lecture.chapter.split(":")[0]}
                      </span>
                      <h3 className={`text-xs font-semibold leading-tight line-clamp-2 ${
                        isCurrent ? "text-white font-bold" : "text-slate-200"
                      }`}>
                        {lecture.title.split(": ")[1] || lecture.title}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                        {lecture.duration}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-2 ${
                      isCurrent ? "text-red-400" : "text-slate-600"
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
