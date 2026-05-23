// "use client";

// import { useRef } from "react";
// import { motion, useInView, Variants } from "framer-motion";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface TechIcon {
//   label: string;
//   svg: React.ReactNode;
//   color: string;
// }

// interface StatCard {
//   value: string;
//   label: string;
//   icon: React.ReactNode;
// }

// // ─── Animation Variants ───────────────────────────────────────────────────────

// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i: number = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
//   }),
// };

// const scaleIn: Variants = {
//   hidden: { opacity: 0, scale: 0.85 },
//   visible: (i: number = 0) => ({
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.6, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] },
//   }),
// };

// const lineExpand: Variants = {
//   hidden: { scaleX: 0 },
//   visible: {
//     scaleX: 1,
//     transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
//   },
// };

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function GlowOrb({ className }: { className?: string }) {
//   return (
//     <div
//       className={`pointer-events-none absolute rounded-full blur-[120px] opacity-20 ${className ?? ""}`}
//     />
//   );
// }

// function SectionLabel({ children }: { children: React.ReactNode }) {
//   return (
//     <motion.div
//       variants={fadeUp}
//       custom={0}
//       className="mb-4 flex items-center gap-3"
//     >
//       <span className="inline-block h-px w-8 origin-left bg-cyan-400 scale-x-100" />
//       <span
//         className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase"
//         style={{ fontFamily: "'IBM Plex Mono', monospace" }}
//       >
//         {children}
//       </span>
//     </motion.div>
//   );
// }

// // ─── Tech Stack Data ──────────────────────────────────────────────────────────

// const techStack: TechIcon[] = [
//   {
//     label: "HTML5",
//     color: "#E34F26",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
//       </svg>
//     ),
//   },
//   {
//     label: "CSS3",
//     color: "#1572B6",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.413z" />
//       </svg>
//     ),
//   },
//   {
//     label: "TypeScript",
//     color: "#3178C6",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M0 12v12h24V0H0zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.728-.05-1.196.331-1.192.967a.88.88 0 00.102.45c.16.331.458.53 1.39.954 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.243-.652-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.214c.202.308.643.731.91.872.766.404 1.817.347 2.335-.118a.883.883 0 00.313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 01-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.197 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.821.053zm-5.634 1.002l.008.983H11.14v8.876H9.313V13.03H6.75v-.964c0-.534.011-.98.026-.99.012-.016 1.724-.024 3.80-.02l3.78.012z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Tailwind",
//     color: "#06B6D4",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Next.js",
//     color: "#ffffff",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.049-.106.005-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.499-.054z" />
//       </svg>
//     ),
//   },
//   {
//     label: "React",
//     color: "#61DAFB",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 00-1.088-.278zm-.005 1.09c.234 0 .416.033.568.117.473.27.696 1.08.584 2.297-.023.225-.048.445-.082.673a19.43 19.43 0 00-2.198-.3 19.76 19.76 0 00-1.433-1.728c.853-.788 1.68-1.058 2.561-1.058zm-9.74 0c.88 0 1.71.272 2.56 1.06a19.77 19.77 0 00-1.43 1.73 19.5 19.5 0 00-2.2.3c-.033-.217-.06-.438-.082-.662-.117-1.218.11-2.03.583-2.3.152-.084.335-.127.57-.127zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034s-.92.013-1.36.034c.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 01-4.412.005 26.64 26.64 0 01-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868A25.172 25.172 0 0112 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 00-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 00-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 00-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 001.341-2.338zm-9.945.02c.46.795.905 1.56 1.338 2.338-.695-.1-1.372-.23-2.012-.389.18-.63.406-1.282.674-1.949zm4.966 4.702c-.61-.61-1.08-1.285-1.495-1.99h2.995c-.415.708-.884 1.384-1.5 1.99zm-.367 1.854c-.455-.468-.91-.993-1.36-1.564.44.02.89.034 1.36.034s.92-.013 1.36-.034c-.44.572-.895 1.096-1.36 1.564z" />
//       </svg>
//     ),
//   },
//   {
//     label: "PHP",
//     color: "#777BB4",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M11.977 0C5.36 0 0 5.373 0 12s5.36 12 11.977 12C18.607 24 24 18.627 24 12S18.607 0 11.977 0zM7.029 7.357h3.655c1.94 0 2.73.978 2.523 2.748-.207 1.658-1.218 2.616-3.005 2.616H8.63l-.443 2.622H6.43l1.599-7.986zm8.87 0h3.655c1.94 0 2.73.978 2.523 2.748-.208 1.658-1.22 2.616-3.006 2.616h-1.572l-.443 2.622h-1.759l1.602-7.986zM3.16 9.876h1.749l-.205 1.195H6.09l.204-1.195h1.748l-.699 3.473H5.594l.225-1.319H4.434l-.225 1.319H2.46l.7-3.473zm5.252.572l-.317 1.792h.887c.779 0 1.207-.327 1.296-.957.09-.66-.22-.835-.909-.835h-.957zm8.87 0l-.317 1.792h.888c.778 0 1.206-.327 1.295-.957.09-.66-.22-.835-.909-.835h-.957z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Node.js",
//     color: "#339933",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.605.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.19-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.048-.139.146-.139.243v10.148c0 .097.055.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.11.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.602V6.921c0-.659.352-1.273.922-1.601l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.943.924 1.601v10.152c0 .659-.354 1.273-.924 1.601l-8.794 5.076c-.281.162-.601.247-.925.247zm2.71-6.996c-3.854 0-4.663-1.772-4.663-3.258 0-.142.113-.254.255-.254h1.138c.126 0 .231.091.253.215.173 1.167.687 1.757 3.017 1.757 1.857 0 2.648-.42 2.648-1.406 0-.568-.224-.99-3.117-1.273-2.418-.238-3.912-.773-3.912-2.707 0-1.782 1.502-2.843 4.018-2.843 2.826 0 4.227.981 4.404 3.088a.255.255 0 01-.063.196.256.256 0 01-.191.085h-1.143a.25.25 0 01-.246-.206c-.276-1.22-.946-1.613-2.761-1.613-2.033 0-2.27.708-2.27 1.239 0 .644.28.831 3.022 1.193 2.714.358 4.005.865 4.005 2.775-.003 1.927-1.608 3.011-4.413 3.011z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Express",
//     color: "#ffffff",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.138-.826zm1.186-.068h9.143c-.183-2.664-1.73-4.134-4.251-4.104-2.478.029-4.343 1.58-4.789 4.104z" />
//       </svg>
//     ),
//   },
//   {
//     label: "MySQL",
//     color: "#4479A1",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.335-4.064h1.095c.242 1.966.378 3.81.438 5.53zm4.017-1.08c0 .71-.214 1.268-.643 1.674-.43.406-1.024.61-1.78.61-.57 0-1.097-.14-1.586-.42l.27-.802c.44.234.895.352 1.364.352.427 0 .76-.1.997-.3.237-.2.356-.478.356-.833 0-.313-.098-.578-.294-.794-.197-.216-.54-.417-1.028-.602-.96-.353-1.44-.888-1.44-1.604 0-.686.23-1.22.687-1.6.458-.38 1.055-.57 1.792-.57.487 0 .942.1 1.362.3l-.27.78c-.35-.19-.72-.284-1.11-.284-.394 0-.703.1-.924.3-.22.2-.33.457-.33.77 0 .294.103.54.31.74.183.187.537.39 1.062.613.6.244 1.038.536 1.318.876.28.34.42.765.42 1.275zm3.666 1.08H11.85V13.17h2.01v5.525zm.29-6.385c-.045.45-.25.676-.614.676-.37 0-.566-.226-.588-.676v-.05c0-.44.195-.664.588-.664.4 0 .602.224.614.664v.05zm4.007 6.385h-1.073l-2.106-3.817h-.01c.03.7.046 1.31.046 1.832v1.985h-.888v-5.525h1.058l2.095 3.8h.008a45.1 45.1 0 01-.035-1.747v-2.053h.905v5.525zm5.197 0h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41h-.725l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41h-.847c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.335-4.064h1.095c.242 1.966.378 3.81.438 5.53z" />
//       </svg>
//     ),
//   },
//   {
//     label: "MongoDB",
//     color: "#47A248",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.746-.604l.18-.137c.965-.648 3.548-2.554 3.548-5.562 0-2.033-.812-4.05-1.182-5.072z" />
//       </svg>
//     ),
//   },
//   {
//     label: "PostgreSQL",
//     color: "#336791",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M17.128 0a10.134 10.134 0 00-2.755.403l-.063.02A10.922 10.922 0 0012.6.258C11.422.238 10.446.6 9.9 1.21a4.538 4.538 0 00-.502.775 7.336 7.336 0 00-1.006-.063c-1.24 0-2.4.439-3.248 1.303C3.55 4.418 3.096 6.19 3.3 8.11c.03.273.076.54.136.8a3.01 3.01 0 00-.43.697C2.56 10.34 2.4 11.364 2.8 12.39c.265.666.693 1.135 1.146 1.478.178 1.335.652 2.483 1.41 3.398C6.555 18.745 7.864 19.533 9.7 19.776V21.5c0 1.381 1.119 2.5 2.5 2.5s2.5-1.119 2.5-2.5v-.498a5.58 5.58 0 001.063-.273c.49.347 1.107.55 1.762.55a3.012 3.012 0 001.734-.554 3.087 3.087 0 001.243-2.01c.88-.334 1.6-.842 2.073-1.519.518-.75.686-1.638.545-2.574a4.558 4.558 0 00-.2-.78c.188-.345.32-.73.386-1.153.18-1.15-.103-2.247-.7-3.034a3.09 3.09 0 00-1.45-1.044c-.143-1.668-.69-3.153-1.65-4.163C19.644.626 18.444 0 17.128 0zm0 1.053c1.039 0 2.037.516 2.848 1.397.81.88 1.348 2.227 1.478 3.826a5.2 5.2 0 011.099.583 2.063 2.063 0 01.82.847c.392.553.58 1.37.437 2.26-.046.286-.135.542-.25.764a4.68 4.68 0 01.252.87c.103.657-.013 1.25-.349 1.72-.394.571-1.052.985-1.912 1.253a2.054 2.054 0 01-.806 1.357c-.347.25-.77.393-1.212.393-.356 0-.702-.092-1.006-.259-.43.138-.886.217-1.378.217h-.01V21.5a1.448 1.448 0 01-2.896 0v-2.26c-1.748-.219-2.887-.994-3.62-1.9-.806-.993-1.247-2.238-1.37-3.544a2.56 2.56 0 01-.832-1.02c-.298-.744-.2-1.525.144-2.276.071-.155.157-.3.254-.44a5.35 5.35 0 01-.16-.845C7.17 7.95 7.55 6.47 8.362 5.644c.67-.685 1.58-1.032 2.6-1.032.27 0 .539.024.802.067.12-.196.255-.379.406-.541.378-.42 1.04-.74 2.04-.74.294 0 .602.035.918.104z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Supabase",
//     color: "#3ECF8E",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.164 12.887.75 14.064 1.79 14.064h9.492c.189 0 .376.047.545.136l-.006-13.164zm.29 21.927c.015.986 1.26 1.41 1.874.637l9.261-11.652c.6-.837.014-2.014-1.026-2.014h-9.492a1.042 1.042 0 01-.545-.136l-.072 13.165z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Solidity",
//     color: "#8B8B8B",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M14.063 0L9.375 8.625h9.375L14.063 0zM4.688 0L0 8.625h9.375L4.688 0zM9.375 8.625L4.688 17.25h9.375L9.375 8.625zM0 8.625l-4.688 8.625H4.688L0 8.625z" transform="translate(4.5)" />
//         <path d="M4.688 24l4.687-8.625H0L4.688 24zM14.062 24l4.688-8.625H9.375L14.062 24zM9.375 15.375l4.688-8.625H4.688l4.687 8.625z" transform="translate(4.5)" />
//       </svg>
//     ),
//   },
//   {
//     label: "Ethereum",
//     color: "#627EEA",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Git",
//     color: "#F05032",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.604-.404-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
//       </svg>
//     ),
//   },
//   {
//     label: "Docker",
//     color: "#2496ED",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.184.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
//       </svg>
//     ),
//   },
// ];

// // ─── Stat Cards Data ──────────────────────────────────────────────────────────

// const stats: StatCard[] = [
//   {
//     value: "5+",
//     label: "Years Building",
//     icon: (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     ),
//   },
//   {
//     value: "30+",
//     label: "Projects Shipped",
//     icon: (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
//       </svg>
//     ),
//   },
//   {
//     value: "12+",
//     label: "Smart Contracts",
//     icon: (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
//       </svg>
//     ),
//   },
//   {
//     value: "99%",
//     label: "Client Satisfaction",
//     icon: (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
//       </svg>
//     ),
//   },
// ];

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function AboutSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

//   return (
//     <section
//       ref={sectionRef}
//       id="about"
//       className="relative overflow-hidden bg-[#020817] py-28 px-4 sm:px-6 lg:px-8"
//       style={{ fontFamily: "'DM Sans', sans-serif" }}
//     >
//       {/* ── Google Fonts ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=IBM+Plex+Mono:wght@400;500&family=Syne:wght@600;700;800&display=swap');
//       `}</style>

//       {/* ── Background atmosphere ── */}
//       <GlowOrb className="w-[500px] h-[500px] bg-cyan-500 top-[-120px] left-[-100px]" />
//       <GlowOrb className="w-[400px] h-[400px] bg-blue-600 bottom-0 right-[-80px]" />
//       <GlowOrb className="w-[300px] h-[300px] bg-violet-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

//       {/* Dot-grid overlay */}
//       <div
//         className="pointer-events-none absolute inset-0"
//         style={{
//           backgroundImage:
//             "radial-gradient(circle, rgba(99,179,237,0.07) 1px, transparent 1px)",
//           backgroundSize: "32px 32px",
//         }}
//       />

//       {/* ── Content wrapper ── */}
//       <div className="relative z-10 mx-auto max-w-6xl">

//         {/* ── Section header ── */}
//         <motion.div
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="mb-20"
//         >
//           <SectionLabel>About Me</SectionLabel>
//           <motion.h2
//             variants={fadeUp}
//             custom={1}
//             className="max-w-2xl text-4xl sm:text-5xl font-extrabold leading-tight text-white"
//             style={{ fontFamily: "'Syne', sans-serif" }}
//           >
//             Crafting the{" "}
//             <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
//               decentralised
//             </span>{" "}
//             future, one commit at a time.
//           </motion.h2>
//           <motion.div
//             variants={lineExpand}
//             className="mt-5 h-px w-40 origin-left bg-gradient-to-r from-cyan-400 to-transparent"
//           />
//         </motion.div>

//         {/* ── Two-column story + stats ── */}
//         <motion.div
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="grid gap-8 lg:grid-cols-2 mb-12"
//         >
//           {/* Story card */}
//           <motion.div
//             variants={fadeUp}
//             custom={2}
//             className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-500 hover:bg-white/[0.05]"
//           >
//             {/* Card inner glow */}
//             <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//               style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(6,182,212,0.06), transparent)" }} />

//             <h3
//               className="mb-5 text-lg font-semibold text-white/80"
//               style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "0.03em" }}
//             >
//               The Origin Story
//             </h3>
//             <p className="mb-4 text-[15px] leading-relaxed text-white/50">
//               I started as a curious kid who broke things to understand them — routers, games, operating systems. That hunger evolved into a career bridging the two most transformative forces of our era:{" "}
//               <span className="text-cyan-400/90 font-medium">full-stack software engineering</span> and{" "}
//               <span className="text-blue-400/90 font-medium">blockchain technology</span>.
//             </p>
//             <p className="mb-4 text-[15px] leading-relaxed text-white/50">
//               Today I architect end-to-end systems — from pixel-perfect React interfaces to battle-tested Solidity contracts and the Node.js APIs that connect them. I believe the next internet will be trustless by default, and I'm building it.
//             </p>
//             <p className="text-[15px] leading-relaxed text-white/50">
//               Outside of code I contribute to open-source DeFi protocols, mentor junior devs, and compulsively read EIPs at 2 am.
//             </p>

//             {/* Bottom accent */}
//             <div className="mt-7 flex items-center gap-3">
//               <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
//               <span className="font-mono text-[11px] text-cyan-500/50 tracking-widest uppercase">EST. 2019</span>
//             </div>
//           </motion.div>

//           {/* Stat cards grid */}
//           <motion.div
//             variants={fadeUp}
//             custom={3}
//             className="grid grid-cols-2 gap-4"
//           >
//             {stats.map((stat, i) => (
//               <motion.div
//                 key={stat.label}
//                 variants={scaleIn}
//                 custom={i}
//                 className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-500 hover:bg-white/[0.06] cursor-default"
//               >
//                 <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                   style={{ background: "radial-gradient(200px circle at 30% 30%, rgba(6,182,212,0.08), transparent)" }} />

//                 <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors duration-300">
//                   {stat.icon}
//                 </div>
//                 <div>
//                   <div
//                     className="text-3xl font-extrabold text-white tabular-nums"
//                     style={{ fontFamily: "'Syne', sans-serif" }}
//                   >
//                     {stat.value}
//                   </div>
//                   <div className="mt-1 text-xs text-white/40 font-medium tracking-wide">
//                     {stat.label}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* ── Blockchain passion strip ── */}
//         <motion.div
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           variants={fadeUp}
//           custom={4}
//           className="group relative mb-12 overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 via-blue-950/30 to-violet-950/30 p-8 backdrop-blur-xl"
//         >
//           <div className="pointer-events-none absolute inset-0 opacity-30"
//             style={{ backgroundImage: "linear-gradient(135deg, rgba(6,182,212,0.15) 0%, transparent 50%, rgba(139,92,246,0.1) 100%)" }} />

//           {/* Animated border beam */}
//           <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
//             <motion.div
//               animate={{ x: ["0%", "200%"] }}
//               transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
//               className="absolute top-0 left-[-100%] h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
//             />
//           </div>

//           <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
//             <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-500/30 text-cyan-300 text-2xl">
//               ⛓
//             </div>
//             <div>
//               <h3
//                 className="mb-2 text-lg font-bold text-white"
//                 style={{ fontFamily: "'Syne', sans-serif" }}
//               >
//                 Blockchain-Native Mindset
//               </h3>
//               <p className="text-[14px] leading-relaxed text-white/50 max-w-2xl">
//                 I don't bolt blockchain on as a feature — I architect systems where <span className="text-cyan-300/80">decentralisation is the foundation</span>. From EVM contract design and gas optimisation to cross-chain bridges and wallet-auth flows, I've shipped on Ethereum mainnet, Polygon, and Arbitrum.
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         {/* ── Tech Stack ── */}
//         <motion.div
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//         >
//           <motion.div variants={fadeUp} custom={5} className="mb-6">
//             <SectionLabel>Tech Stack</SectionLabel>
//             <p className="text-sm text-white/35 max-w-sm">
//               Tools I reach for every single day.
//             </p>
//           </motion.div>

//           <motion.div
//             variants={fadeUp}
//             custom={6}
//             className="flex flex-wrap gap-3"
//           >
//             {techStack.map((tech, i) => (
//               <motion.div
//                 key={tech.label}
//                 variants={scaleIn}
//                 custom={i * 0.5}
//                 whileHover={{ y: -4, scale: 1.06 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                 className="group relative flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-2.5 backdrop-blur-md hover:border-white/20 cursor-default transition-colors duration-300"
//               >
//                 {/* Icon coloured by tech */}
//                 <span
//                   className="transition-all duration-300 group-hover:drop-shadow-[0_0_6px_currentColor]"
//                   style={{ color: tech.color }}
//                 >
//                   {tech.svg}
//                 </span>
//                 <span className="text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors duration-300">
//                   {tech.label}
//                 </span>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* ── CTA strip ── */}
//         <motion.div
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           variants={fadeUp}
//           custom={8}
//           className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl"
//         >
//           <div>
//             <p
//               className="text-base font-semibold text-white/80"
//               style={{ fontFamily: "'Syne', sans-serif" }}
//             >
//               Open to new opportunities
//             </p>
//             <p className="text-sm text-white/35 mt-0.5">
//               Full-time roles, contracts, or DeFi protocol collaborations.
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <motion.a
//               href="#contact"
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.97 }}
//               className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow duration-300"
//             >
//               Let's Talk
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </motion.a>
//             <motion.a
//               href="/resume.pdf"
//               target="_blank"
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.97 }}
//               className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-colors duration-300"
//             >
//               Résumé
//             </motion.a>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }




// export default function AboutSection() {
// //   const techStack = [
// //     { name: 'HTML', icon: '</>' },
// //     { name: 'CSS', icon: '✦' },
// //     { name: 'Tailwind', icon: '≈' },
// //     { name: 'TypeScript', icon: 'TS' },
// //     { name: 'Next.js', icon: '▲' },
// //     { name: 'Express', icon: 'EX' },
// //     { name: 'PHP', icon: 'PHP' },
// //     { name: 'MySQL', icon: '◈' },
// //     { name: 'MongoDB', icon: '⬢' },
// //     { name: 'Supabase', icon: '⚡' },
// //     { name: 'Git', icon: '⎇' },
// //     { name: 'Solidity', icon: '⬡' },
// //   ];


// // ─── Tech Stack Data ──────────────────────────────────────────────────────────

// const techStack = [
//   {
//     label: "TypeScript",
//     color: "#3178C6",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M0 12v12h24V0H0zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.728-.05-1.196.331-1.192.967a.88.88 0 00.102.45c.16.331.458.53 1.39.954 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.243-.652-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.214c.202.308.643.731.91.872.766.404 1.817.347 2.335-.118a.883.883 0 00.313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 01-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.197 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.821.053zm-5.634 1.002l.008.983H11.14v8.876H9.313V13.03H6.75v-.964c0-.534.011-.98.026-.99.012-.016 1.724-.024 3.80-.02l3.78.012z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Next.js",
//     color: "#ffffff",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.049-.106.005-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.499-.054z" />
//       </svg>
//     ),
//   },
//   {
//     label: "React",
//     color: "#61DAFB",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 00-1.088-.278zm-.005 1.09c.234 0 .416.033.568.117.473.27.696 1.08.584 2.297-.023.225-.048.445-.082.673a19.43 19.43 0 00-2.198-.3 19.76 19.76 0 00-1.433-1.728c.853-.788 1.68-1.058 2.561-1.058zm-9.74 0c.88 0 1.71.272 2.56 1.06a19.77 19.77 0 00-1.43 1.73 19.5 19.5 0 00-2.2.3c-.033-.217-.06-.438-.082-.662-.117-1.218.11-2.03.583-2.3.152-.084.335-.127.57-.127zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034s-.92.013-1.36.034c.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 01-4.412.005 26.64 26.64 0 01-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868A25.172 25.172 0 0112 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 00-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 00-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 00-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 001.341-2.338zm-9.945.02c.46.795.905 1.56 1.338 2.338-.695-.1-1.372-.23-2.012-.389.18-.63.406-1.282.674-1.949zm4.966 4.702c-.61-.61-1.08-1.285-1.495-1.99h2.995c-.415.708-.884 1.384-1.5 1.99zm-.367 1.854c-.455-.468-.91-.993-1.36-1.564.44.02.89.034 1.36.034s.92-.013 1.36-.034c-.44.572-.895 1.096-1.36 1.564z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Tailwind",
//     color: "#38BDF8",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M12 6c-2.67 0-4.33 1.33-5 4 .83-1.33 1.83-1.83 3-1.5.65.19 1.11.65 1.62 1.17.84.84 1.8 1.83 3.88 1.83 2.67 0 4.33-1.33 5-4-.83 1.33-1.83 1.83-3 1.5-.65-.19-1.11-.65-1.62-1.17-.84-.84-1.8-1.83-3.88-1.83zm-5 6c-2.67 0-4.33 1.33-5 4 .83-1.33 1.83-1.83 3-1.5.65.19 1.11.65 1.62 1.17.84.84 1.8 1.83 3.88 1.83 2.67 0 4.33-1.33 5-4-.83 1.33-1.83 1.83-3 1.5-.65-.19-1.11-.65-1.62-1.17-.84-.84-1.8-1.83-3.88-1.83z"/>
//       </svg>
//     ),
//   },
//   {
//     label: "Node.js",
//     color: "#339933",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.605.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.19-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.048-.139.146-.139.243v10.148c0 .097.055.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.11.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.602V6.921c0-.659.352-1.273.922-1.601l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.943.924 1.601v10.152c0 .659-.354 1.273-.924 1.601l-8.794 5.076c-.281.162-.601.247-.925.247zm2.71-6.996c-3.854 0-4.663-1.772-4.663-3.258 0-.142.113-.254.255-.254h1.138c.126 0 .231.091.253.215.173 1.167.687 1.757 3.017 1.757 1.857 0 2.648-.42 2.648-1.406 0-.568-.224-.99-3.117-1.273-2.418-.238-3.912-.773-3.912-2.707 0-1.782 1.502-2.843 4.018-2.843 2.826 0 4.227.981 4.404 3.088a.255.255 0 01-.063.196.256.256 0 01-.191.085h-1.143a.25.25 0 01-.246-.206c-.276-1.22-.946-1.613-2.761-1.613-2.033 0-2.27.708-2.27 1.239 0 .644.28.831 3.022 1.193 2.714.358 4.005.865 4.005 2.775-.003 1.927-1.608 3.011-4.413 3.011z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Express",
//     color: "#ffffff",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M24 18.588l-2.104-1.473a5.322 5.322 0 01-1.831.957c-.717.196-1.43.294-2.137.294-1.335 0-2.365-.406-3.09-1.22-.725-.813-1.087-1.917-1.087-3.312 0-1.476.386-2.64 1.157-3.49.771-.85 1.845-1.276 3.222-1.276.645 0 1.28.08 1.906.24.625.16 1.207.407 1.746.74v-2.39c-.746-.254-1.527-.38-2.343-.38-1.836 0-3.235.612-4.196 1.837-.96 1.225-1.44 2.866-1.44 4.925 0 2.079.478 3.693 1.433 4.843.955 1.15 2.384 1.725 4.287 1.725.97 0 1.876-.158 2.718-.475.84-.317 1.575-.807 2.204-1.47l-1.178-.884zM12.814 17.556c-.681.646-1.53.97-2.546.97-1.019 0-1.854-.332-2.505-.997-.65-.665-.976-1.553-.976-2.663 0-1.12.327-2.008.98-2.663.654-.655 1.486-.982 2.498-.982.98 0 1.816.32 2.506.96.69.64 1.034 1.536 1.034 2.685 0 1.125-.346 2.011-1.037 2.646a2.884 2.884 0 01-.954-.956zM3.576 18.572c-.932 0-1.702-.257-2.312-.77-.61-.513-.914-1.215-.914-2.106 0-.896.302-1.604.907-2.124.605-.52 1.407-.78 2.407-.78.667 0 1.265.106 1.795.317.53.212.96.486 1.29.823l-1.01 1.183c-.379-.356-.835-.604-1.367-.744-.532-.14-1.038-.21-1.518-.21-.536 0-.965.124-1.287.373-.322.25-.483.58-.483.993 0 .41.159.731.477.964.318.233.766.35 1.343.35.468 0 .936-.101 1.404-.303.468-.202.867-.47 1.197-.803l1.05 1.113c-.594.588-1.278 1.035-2.052 1.34-.774.306-1.576.46-2.406.46z"/>
//       </svg>
//     ),
//   },
//   {
//     label: "MongoDB",
//     color: "#47A248",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zM12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
//         <path d="M12 5.5c-3.584 0-6.5 2.916-6.5 6.5s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5zm0 11c-2.481 0-4.5-2.019-4.5-4.5S9.519 7.5 12 7.5s4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z"/>
//       </svg>
//     ),
//   },
//   {
//     label: "PostgreSQL",
//     color: "#336791",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M17.128 0a10.134 10.134 0 00-2.755.403l-.063.02A10.922 10.922 0 0012.6.258C11.422.238 10.446.6 9.9 1.21a4.538 4.538 0 00-.502.775 7.336 7.336 0 00-1.006-.063c-1.24 0-2.4.439-3.248 1.303C3.55 4.418 3.096 6.19 3.3 8.11c.03.273.076.54.136.8a3.01 3.01 0 00-.43.697C2.56 10.34 2.4 11.364 2.8 12.39c.265.666.693 1.135 1.146 1.478.178 1.335.652 2.483 1.41 3.398C6.555 18.745 7.864 19.533 9.7 19.776V21.5c0 1.381 1.119 2.5 2.5 2.5s2.5-1.119 2.5-2.5v-.498a5.58 5.58 0 001.063-.273c.49.347 1.107.55 1.762.55a3.012 3.012 0 001.734-.554 3.087 3.087 0 001.243-2.01c.88-.334 1.6-.842 2.073-1.519.518-.75.686-1.638.545-2.574a4.558 4.558 0 00-.2-.78c.188-.345.32-.73.386-1.153.18-1.15-.103-2.247-.7-3.034a3.09 3.09 0 00-1.45-1.044c-.143-1.668-.69-3.153-1.65-4.163C19.644.626 18.444 0 17.128 0zm0 1.053c1.039 0 2.037.516 2.848 1.397.81.88 1.348 2.227 1.478 3.826a5.2 5.2 0 011.099.583 2.063 2.063 0 01.82.847c.392.553.58 1.37.437 2.26-.046.286-.135.542-.25.764a4.68 4.68 0 01.252.87c.103.657-.013 1.25-.349 1.72-.394.571-1.052.985-1.912 1.253a2.054 2.054 0 01-.806 1.357c-.347.25-.77.393-1.212.393-.356 0-.702-.092-1.006-.259-.43.138-.886.217-1.378.217h-.01V21.5a1.448 1.448 0 01-2.896 0v-2.26c-1.748-.219-2.887-.994-3.62-1.9-.806-.993-1.247-2.238-1.37-3.544a2.56 2.56 0 01-.832-1.02c-.298-.744-.2-1.525.144-2.276.071-.155.157-.3.254-.44a5.35 5.35 0 01-.16-.845C7.17 7.95 7.55 6.47 8.362 5.644c.67-.685 1.58-1.032 2.6-1.032.27 0 .539.024.802.067.12-.196.255-.379.406-.541.378-.42 1.04-.74 2.04-.74.294 0 .602.035.918.104z" />
//       </svg>
//     ),
//   },
//   {
//     label: "MySQL",
//     color: "#4479A1",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M18.5 9.5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h1c.6 0 1-.4 1-1s-.4-1-1-1h-1c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h1c.6 0 1 .4 1 1s.4 1 1 1 .9-.4.9-1c0-1.1-.8-2-1.9-2zM3.5 9.5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h1c.6 0 1-.4 1-1s-.4-1-1-1h-1c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h1c.6 0 1 .4 1 1s.4 1 1 1 .9-.4.9-1c0-1.1-.8-2-1.9-2zM12.5 9.5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h1c.6 0 1-.4 1-1s-.4-1-1-1h-1c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h1c.6 0 1 .4 1 1s.4 1 1 1 .9-.4.9-1c0-1.1-.8-2-1.9-2z"/>
//       </svg>
//     ),
//   },
//   {
//     label: "PHP",
//     color: "#777BB4",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M7.01 10.19h1.65c.36 0 .61.11.75.33.14.22.15.53.02.93l-.46 1.93c-.06.23-.18.4-.36.51-.18.11-.39.16-.63.16H6.95l.06-3.86zm15.56 2.25c.07-.28.11-.57.11-.86 0-1.75-1.1-3.26-2.91-3.26h-3.68c-.43 0-.77.34-.77.77v8.2c0 .43.34.77.77.77h1.05c.43 0 .77-.34.77-.77v-2.42h1.51c.35 0 .6-.11.75-.33.15-.22.2-.51.15-.89l-.25-1.01c-.04-.15-.13-.27-.25-.35-.12-.08-.27-.12-.45-.12h-1.46v-1.16h1.89c.69 0 1.2.31 1.5.93.3.62.25 1.38-.15 2.27-.04.09-.07.18-.09.27h1.04c.13 0 .25-.03.36-.1.11-.07.19-.17.24-.3zM0 11.84c0 1.38.56 2.43 1.68 3.14.56.36 1.21.54 1.96.54h2.28c.43 0 .77-.34.77-.77v-1.7c0-.43-.34-.77-.77-.77H4.64c-.44 0-.78-.36-.78-.8 0-.44.34-.8.78-.8h2.53c.49 0 .95-.07 1.38-.22.67-.23 1.18-.65 1.51-1.26.24-.45.36-.96.36-1.54 0-1.38-.56-2.43-1.68-3.14-.56-.36-1.21-.54-1.96-.54h-2.6c-.43 0-.77.34-.77.77v8.19c0 .43.34.77.77.77h1.05c.43 0 .77-.34.77-.77v-3.43c0-.43-.34-.77-.77-.77H3.48c-.63 0-1.09-.35-1.38-1.04-.12-.3-.19-.64-.22-1.01-.03-.37-.07-.74-.07-1.11z"/>
//       </svg>
//     ),
//   },
//   {
//     label: "Git",
//     color: "#F05032",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.543-.541-.674-1.323-.396-1.96l-2.478-2.48v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.719-1.881.719-2.6 0-.719-.717-.719-1.879 0-2.598.18-.18.388-.307.6-.401V9.539c-.212-.094-.42-.221-.6-.401-.545-.545-.676-1.321-.396-1.96L9.184 4.42 3.514 10.09c-.604.605-.604 1.584 0 2.188l10.48 10.48c.604.604 1.582.604 2.187 0l7.365-7.365c.604-.604.604-1.582 0-2.187z"/>
//       </svg>
//     ),
//   },
//   {
//     label: "Supabase",
//     color: "#3ECF8E",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M11.999 0c.14 0 .27.054.37.15.1.097.16.23.16.37v10.48h10.48c.14 0 .27.055.37.15.1.097.16.23.16.37 0 .14-.054.27-.15.37l-14 14c-.1.1-.23.16-.37.16-.14 0-.27-.054-.37-.15-.1-.097-.16-.23-.16-.37v-10.48H2.48c-.14 0-.27-.055-.37-.15-.1-.097-.16-.23-.16-.37 0-.14.054-.27.15-.37l14-14c.1-.1.23-.16.37-.16z"/>
//       </svg>
//     ),
//   },
//   {
//     label: "HTML5",
//     color: "#E34F26",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
//       </svg>
//     ),
//   },
//   {
//     label: "CSS3",
//     color: "#1572B6",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
//       </svg>
//     ),
//   },
//   {
//     label: "Solidity",
//     color: "#363636",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M16.5 0l-4.5 8h9L16.5 0zM7.5 0L3 8h9L7.5 0zM12 8L7.5 16h9L12 8zM3 8L-1.5 16h9L3 8z" transform="translate(3)" />
//         <path d="M7.5 24l4.5-8H3l4.5 8zM16.5 24L21 16h-9l4.5 8zM12 16l4.5-8h-9L12 16z" transform="translate(3)" />
//       </svg>
//     ),
//   },
//   {
//     label: "Ethereum",
//     color: "#627EEA",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Docker",
//     color: "#2496ED",
//     svg: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.184.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
//       </svg>
//     ),
//   },
// ];

// // Rest of your component remains exactly the same...

//   const stats = [
//     { label: 'Years Building', value: '5+' },
//     { label: 'Projects Shipped', value: '40+' },
//     { label: 'Smart Contracts', value: '20+' },
//     { label: 'Global Clients', value: '15+' },
//   ];

//   return (
//     <section className="relative overflow-hidden bg-[#050816] py-24 text-white">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_45%)]" />
//       <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
//       <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

//       <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="grid items-center gap-16 lg:grid-cols-2">
//           {/* Left Content */}
//           <div className="space-y-8">
//             <div className="inline-flex items-center rounded-full border border-blue-400/20 bg-white/5 px-4 py-2 text-sm text-blue-300 backdrop-blur-xl">
//               Futuristic Full-Stack Engineer
//             </div>

//             <div className="space-y-6">
//               <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
//                 Building immersive digital products with
//                 <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
//                   {' '}modern web & blockchain technology.
//                 </span>
//               </h2>

//               <p className="text-lg leading-relaxed text-slate-300">
//                 I’m a full-stack developer focused on crafting premium user experiences,
//                 scalable backend systems, and innovative blockchain solutions. My passion
//                 lies in merging sleek design with high-performance architecture to build
//                 futuristic applications that feel effortless.
//               </p>

//               <p className="text-base leading-relaxed text-slate-400">
//                 From decentralized ecosystems to polished SaaS platforms, I enjoy solving
//                 complex problems with clean code, modern frameworks, and intuitive product
//                 thinking. Every interface I design is engineered for performance, clarity,
//                 and impact.
//               </p>
//             </div>

//             {/* Tech Stack */}
//             <div className="space-y-5">
//               <div>
//                 <h3 className="text-lg font-semibold text-white">Core Tech Stack</h3>
//                 <p className="mt-1 text-sm text-slate-400">
//                   Modern technologies powering scalable and immersive digital experiences.
//                 </p>
//               </div>

//               <div className="flex flex-wrap gap-4">
//                 {techStack.map((tech, index) => (
//                   <div
//                     key={index}
//                     className="group relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-500/10"
//                   >
//                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-400/20 text-sm font-bold text-blue-200 shadow-lg shadow-blue-500/10 transition-transform duration-300 group-hover:scale-110">
//                       {tech.icon}
//                     </div>
//                     <span className="text-sm font-medium text-slate-200">
//                       {tech.name}
//                     </span>

//                     <div className="absolute inset-0 rounded-2xl border border-blue-400/0 transition-all duration-300 group-hover:border-blue-400/20" />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Content */}
//           <div className="grid gap-6 sm:grid-cols-2">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-400/20 hover:bg-white/10"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

//                 <div className="relative z-10">
//                   <div className="text-4xl font-bold text-white">
//                     {stat.value}
//                   </div>
//                   <div className="mt-2 text-sm tracking-wide text-slate-400">
//                     {stat.label}
//                   </div>
//                 </div>

//                 <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20" />
//               </div>
//             ))}

//             {/* Highlight Card */}
//             <div className="relative col-span-full overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 p-8 backdrop-blur-2xl">
//               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.25),transparent_45%)]" />

//               <div className="relative z-10 space-y-4">
//                 <div className="inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-blue-300">
//                   Blockchain & Web3
//                 </div>

//                 <h3 className="text-2xl font-semibold leading-snug text-white">
//                   Passionate about decentralized systems and next-generation applications.
//                 </h3>

//                 <p className="max-w-xl text-sm leading-relaxed text-slate-300">
//                   I enjoy building secure smart contracts, scalable APIs, and modern user
//                   interfaces that bridge traditional software with blockchain innovation.
//                   My goal is to create products that feel futuristic while remaining highly
//                   usable and accessible.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TechIcon {
  label: string;
  svg: React.ReactNode;
  color: string;
}

interface StatCard {
  value: string;
  label: string;
  icon: React.ReactNode;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

const lineExpand: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function GlowOrb({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[120px] opacity-20 ${className ?? ""}`}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      className="mb-4 flex items-center gap-3"
    >
      <span className="inline-block h-px w-8 origin-left bg-cyan-400 scale-x-100" />
      <span
        className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {children}
      </span>
    </motion.div>
  );
}

// ─── Tech Stack Data ──────────────────────────────────────────────────────────

const techStack: TechIcon[] = [
  {
    label: "HTML5",
    color: "#E34F26",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
      </svg>
    ),
  },
  {
    label: "CSS3",
    color: "#1572B6",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.413z" />
      </svg>
    ),
  },
  {
    label: "TypeScript",
    color: "#3178C6",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M0 12v12h24V0H0zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.728-.05-1.196.331-1.192.967a.88.88 0 00.102.45c.16.331.458.53 1.39.954 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.243-.652-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.214c.202.308.643.731.91.872.766.404 1.817.347 2.335-.118a.883.883 0 00.313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 01-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.197 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.821.053zm-5.634 1.002l.008.983H11.14v8.876H9.313V13.03H6.75v-.964c0-.534.011-.98.026-.99.012-.016 1.724-.024 3.80-.02l3.78.012z" />
      </svg>
    ),
  },
  {
    label: "Tailwind",
    color: "#06B6D4",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    label: "Next.js",
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.049-.106.005-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.499-.054z" />
      </svg>
    ),
  },
  {
    label: "React",
    color: "#61DAFB",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 00-1.088-.278zm-.005 1.09c.234 0 .416.033.568.117.473.27.696 1.08.584 2.297-.023.225-.048.445-.082.673a19.43 19.43 0 00-2.198-.3 19.76 19.76 0 00-1.433-1.728c.853-.788 1.68-1.058 2.561-1.058zm-9.74 0c.88 0 1.71.272 2.56 1.06a19.77 19.77 0 00-1.43 1.73 19.5 19.5 0 00-2.2.3c-.033-.217-.06-.438-.082-.662-.117-1.218.11-2.03.583-2.3.152-.084.335-.127.57-.127zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034s-.92.013-1.36.034c.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 01-4.412.005 26.64 26.64 0 01-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868A25.172 25.172 0 0112 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 00-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 00-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 00-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 001.341-2.338zm-9.945.02c.46.795.905 1.56 1.338 2.338-.695-.1-1.372-.23-2.012-.389.18-.63.406-1.282.674-1.949zm4.966 4.702c-.61-.61-1.08-1.285-1.495-1.99h2.995c-.415.708-.884 1.384-1.5 1.99zm-.367 1.854c-.455-.468-.91-.993-1.36-1.564.44.02.89.034 1.36.034s.92-.013 1.36-.034c-.44.572-.895 1.096-1.36 1.564z" />
      </svg>
    ),
  },
  {
    label: "PHP",
    color: "#777BB4",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.977 0C5.36 0 0 5.373 0 12s5.36 12 11.977 12C18.607 24 24 18.627 24 12S18.607 0 11.977 0zM7.029 7.357h3.655c1.94 0 2.73.978 2.523 2.748-.207 1.658-1.218 2.616-3.005 2.616H8.63l-.443 2.622H6.43l1.599-7.986zm8.87 0h3.655c1.94 0 2.73.978 2.523 2.748-.208 1.658-1.22 2.616-3.006 2.616h-1.572l-.443 2.622h-1.759l1.602-7.986zM3.16 9.876h1.749l-.205 1.195H6.09l.204-1.195h1.748l-.699 3.473H5.594l.225-1.319H4.434l-.225 1.319H2.46l.7-3.473zm5.252.572l-.317 1.792h.887c.779 0 1.207-.327 1.296-.957.09-.66-.22-.835-.909-.835h-.957zm8.87 0l-.317 1.792h.888c.778 0 1.206-.327 1.295-.957.09-.66-.22-.835-.909-.835h-.957z" />
      </svg>
    ),
  },
  {
    label: "Node.js",
    color: "#339933",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.605.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.19-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.048-.139.146-.139.243v10.148c0 .097.055.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.11.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.602V6.921c0-.659.352-1.273.922-1.601l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.943.924 1.601v10.152c0 .659-.354 1.273-.924 1.601l-8.794 5.076c-.281.162-.601.247-.925.247zm2.71-6.996c-3.854 0-4.663-1.772-4.663-3.258 0-.142.113-.254.255-.254h1.138c.126 0 .231.091.253.215.173 1.167.687 1.757 3.017 1.757 1.857 0 2.648-.42 2.648-1.406 0-.568-.224-.99-3.117-1.273-2.418-.238-3.912-.773-3.912-2.707 0-1.782 1.502-2.843 4.018-2.843 2.826 0 4.227.981 4.404 3.088a.255.255 0 01-.063.196.256.256 0 01-.191.085h-1.143a.25.25 0 01-.246-.206c-.276-1.22-.946-1.613-2.761-1.613-2.033 0-2.27.708-2.27 1.239 0 .644.28.831 3.022 1.193 2.714.358 4.005.865 4.005 2.775-.003 1.927-1.608 3.011-4.413 3.011z" />
      </svg>
    ),
  },
  {
    label: "Express",
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.138-.826zm1.186-.068h9.143c-.183-2.664-1.73-4.134-4.251-4.104-2.478.029-4.343 1.58-4.789 4.104z" />
      </svg>
    ),
  },
  {
    label: "MySQL",
    color: "#4479A1",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.335-4.064h1.095c.242 1.966.378 3.81.438 5.53zm4.017-1.08c0 .71-.214 1.268-.643 1.674-.43.406-1.024.61-1.78.61-.57 0-1.097-.14-1.586-.42l.27-.802c.44.234.895.352 1.364.352.427 0 .76-.1.997-.3.237-.2.356-.478.356-.833 0-.313-.098-.578-.294-.794-.197-.216-.54-.417-1.028-.602-.96-.353-1.44-.888-1.44-1.604 0-.686.23-1.22.687-1.6.458-.38 1.055-.57 1.792-.57.487 0 .942.1 1.362.3l-.27.78c-.35-.19-.72-.284-1.11-.284-.394 0-.703.1-.924.3-.22.2-.33.457-.33.77 0 .294.103.54.31.74.183.187.537.39 1.062.613.6.244 1.038.536 1.318.876.28.34.42.765.42 1.275zm3.666 1.08H11.85V13.17h2.01v5.525zm.29-6.385c-.045.45-.25.676-.614.676-.37 0-.566-.226-.588-.676v-.05c0-.44.195-.664.588-.664.4 0 .602.224.614.664v.05zm4.007 6.385h-1.073l-2.106-3.817h-.01c.03.7.046 1.31.046 1.832v1.985h-.888v-5.525h1.058l2.095 3.8h.008a45.1 45.1 0 01-.035-1.747v-2.053h.905v5.525zm5.197 0h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41h-.725l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41h-.847c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.335-4.064h1.095c.242 1.966.378 3.81.438 5.53z" />
      </svg>
    ),
  },
  {
    label: "MongoDB",
    color: "#47A248",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.746-.604l.18-.137c.965-.648 3.548-2.554 3.548-5.562 0-2.033-.812-4.05-1.182-5.072z" />
      </svg>
    ),
  },
  {
    label: "PostgreSQL",
    color: "#336791",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.128 0a10.134 10.134 0 00-2.755.403l-.063.02A10.922 10.922 0 0012.6.258C11.422.238 10.446.6 9.9 1.21a4.538 4.538 0 00-.502.775 7.336 7.336 0 00-1.006-.063c-1.24 0-2.4.439-3.248 1.303C3.55 4.418 3.096 6.19 3.3 8.11c.03.273.076.54.136.8a3.01 3.01 0 00-.43.697C2.56 10.34 2.4 11.364 2.8 12.39c.265.666.693 1.135 1.146 1.478.178 1.335.652 2.483 1.41 3.398C6.555 18.745 7.864 19.533 9.7 19.776V21.5c0 1.381 1.119 2.5 2.5 2.5s2.5-1.119 2.5-2.5v-.498a5.58 5.58 0 001.063-.273c.49.347 1.107.55 1.762.55a3.012 3.012 0 001.734-.554 3.087 3.087 0 001.243-2.01c.88-.334 1.6-.842 2.073-1.519.518-.75.686-1.638.545-2.574a4.558 4.558 0 00-.2-.78c.188-.345.32-.73.386-1.153.18-1.15-.103-2.247-.7-3.034a3.09 3.09 0 00-1.45-1.044c-.143-1.668-.69-3.153-1.65-4.163C19.644.626 18.444 0 17.128 0zm0 1.053c1.039 0 2.037.516 2.848 1.397.81.88 1.348 2.227 1.478 3.826a5.2 5.2 0 011.099.583 2.063 2.063 0 01.82.847c.392.553.58 1.37.437 2.26-.046.286-.135.542-.25.764a4.68 4.68 0 01.252.87c.103.657-.013 1.25-.349 1.72-.394.571-1.052.985-1.912 1.253a2.054 2.054 0 01-.806 1.357c-.347.25-.77.393-1.212.393-.356 0-.702-.092-1.006-.259-.43.138-.886.217-1.378.217h-.01V21.5a1.448 1.448 0 01-2.896 0v-2.26c-1.748-.219-2.887-.994-3.62-1.9-.806-.993-1.247-2.238-1.37-3.544a2.56 2.56 0 01-.832-1.02c-.298-.744-.2-1.525.144-2.276.071-.155.157-.3.254-.44a5.35 5.35 0 01-.16-.845C7.17 7.95 7.55 6.47 8.362 5.644c.67-.685 1.58-1.032 2.6-1.032.27 0 .539.024.802.067.12-.196.255-.379.406-.541.378-.42 1.04-.74 2.04-.74.294 0 .602.035.918.104z" />
      </svg>
    ),
  },
  {
    label: "Supabase",
    color: "#3ECF8E",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.164 12.887.75 14.064 1.79 14.064h9.492c.189 0 .376.047.545.136l-.006-13.164zm.29 21.927c.015.986 1.26 1.41 1.874.637l9.261-11.652c.6-.837.014-2.014-1.026-2.014h-9.492a1.042 1.042 0 01-.545-.136l-.072 13.165z" />
      </svg>
    ),
  },
  {
    label: "Solidity",
    color: "#8B8B8B",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M14.063 0L9.375 8.625h9.375L14.063 0zM4.688 0L0 8.625h9.375L4.688 0zM9.375 8.625L4.688 17.25h9.375L9.375 8.625zM0 8.625l-4.688 8.625H4.688L0 8.625z" transform="translate(4.5)" />
        <path d="M4.688 24l4.687-8.625H0L4.688 24zM14.062 24l4.688-8.625H9.375L14.062 24zM9.375 15.375l4.688-8.625H4.688l4.687 8.625z" transform="translate(4.5)" />
      </svg>
    ),
  },
  {
    label: "Ethereum",
    color: "#627EEA",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
      </svg>
    ),
  },
  {
    label: "Git",
    color: "#F05032",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.604-.404-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
      </svg>
    ),
  },
  {
    label: "Docker",
    color: "#2496ED",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.184.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
      </svg>
    ),
  },
];

// ─── Stat Cards Data ──────────────────────────────────────────────────────────

const stats: StatCard[] = [
  {
    value: "2+",
    label: "Years Building",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: "5+",
    label: "Projects Shipped",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    value: "3+",
    label: "Smart Contracts",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    value: "91%",
    label: "Client Satisfaction",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#020817] py-28 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=IBM+Plex+Mono:wght@400;500&family=Syne:wght@600;700;800&display=swap');
      `}</style>

      {/* ── Background atmosphere ── */}
      <GlowOrb className="w-[500px] h-[500px] bg-cyan-500 top-[-120px] left-[-100px]" />
      <GlowOrb className="w-[400px] h-[400px] bg-blue-600 bottom-0 right-[-80px]" />
      <GlowOrb className="w-[300px] h-[300px] bg-violet-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Dot-grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(99,179,237,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ── Section header ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <SectionLabel>About Me</SectionLabel>
          {/* <motion.h2
            variants={fadeUp}
            custom={1}
            className="max-w-2xl text-4xl sm:text-5xl font-extrabold leading-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Crafting the{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              decentralised
            </span>{" "}
            future, one commit at a time.
          </motion.h2> */}
          <motion.h2
  variants={fadeUp}
  custom={1}
  className="max-w-xl text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug"
>
  Crafting the{" "}
  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
    decentralized
  </span>{" "}
  future, one commit at a time.
</motion.h2>
          <motion.div
            variants={lineExpand}
            className="mt-5 h-px w-40 origin-left bg-gradient-to-r from-cyan-400 to-transparent"
          />
        </motion.div>

        {/* ── Two-column story + stats ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 lg:grid-cols-2 mb-12"
        >
          {/* Story card */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-500 hover:bg-white/[0.05]"
          >
            {/* Card inner glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(6,182,212,0.06), transparent)" }} />

            <h3
              className="mb-5 text-lg font-semibold text-white/80"
              style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "0.03em" }}
            >
              The Origin Story
            </h3>
            <p className="mb-4 text-[15px] leading-relaxed text-white/50">
              I started as a curious kid who broke things to understand them — routers, games, operating systems. That hunger evolved into a career bridging the two most transformative forces of our era:{" "}
              <span className="text-cyan-400/90 font-medium">full-stack software engineering</span> and{" "}
              <span className="text-blue-400/90 font-medium">blockchain technology</span>.
            </p>
            <p className="mb-4 text-[15px] leading-relaxed text-white/50">
              Today I architect end-to-end systems — from pixel-perfect React interfaces to battle-tested Solidity contracts and the Node.js APIs that connect them. I believe the next internet will be trustless by default, and I'm building it.
            </p>
            <p className="text-[15px] leading-relaxed text-white/50">
              Outside of code I contribute to open-source DeFi protocols, mentor junior devs, and compulsively read EIPs at 2 am.
            </p>

            {/* Bottom accent */}
            <div className="mt-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
              <span className="font-mono text-[11px] text-cyan-500/50 tracking-widest uppercase">EST. 2024</span>
            </div>
          </motion.div>

          {/* Stat cards grid */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                custom={i}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-500 hover:bg-white/[0.06] cursor-default"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(200px circle at 30% 30%, rgba(6,182,212,0.08), transparent)" }} />

                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  {stat.icon}
                </div>
                <div>
                  <div
                    className="text-3xl font-extrabold text-white tabular-nums"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-white/40 font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Blockchain passion strip ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={4}
          className="group relative mb-12 overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 via-blue-950/30 to-violet-950/30 p-8 backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0 opacity-30"
            style={{ backgroundImage: "linear-gradient(135deg, rgba(6,182,212,0.15) 0%, transparent 50%, rgba(139,92,246,0.1) 100%)" }} />

          {/* Animated border beam */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "200%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-[-100%] h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
            />
          </div>

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-500/30 text-cyan-300 text-2xl">
              ⛓
            </div>
            <div>
              <h3
                className="mb-2 text-lg font-bold text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Blockchain-Native Mindset
              </h3>
              <p className="text-[14px] leading-relaxed text-white/50 max-w-2xl">
                I don't bolt blockchain on as a feature — I architect systems where <span className="text-cyan-300/80">decentralisation is the foundation</span>. From EVM contract design and gas optimisation to cross-chain bridges and wallet-auth flows, I've shipped on Ethereum mainnet, Polygon, and Arbitrum.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Tech Stack ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={5} className="mb-6">
            <SectionLabel>Tech Stack</SectionLabel>
            <p className="text-sm text-white/35 max-w-sm">
              Tools I reach for every single day.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={6}
            className="flex flex-wrap gap-3"
          >
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.label}
                variants={scaleIn}
                custom={i * 0.5}
                whileHover={{ y: -4, scale: 1.06 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group relative flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-2.5 backdrop-blur-md hover:border-white/20 cursor-default transition-colors duration-300"
              >
                {/* Icon coloured by tech */}
                <span
                  className="transition-all duration-300 group-hover:drop-shadow-[0_0_6px_currentColor]"
                  style={{ color: tech.color }}
                >
                  {tech.svg}
                </span>
                <span className="text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors duration-300">
                  {tech.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── CTA strip ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={8}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl"
        >
          <div>
            <p
              className="text-base font-semibold text-white/80"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Open to new opportunities
            </p>
            <p className="text-sm text-white/35 mt-0.5">
              Full-time roles, contracts, or DeFi protocol collaborations.
            </p>
          </div>
          <div className="flex gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow duration-300"
            >
              Let's Talk
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-colors duration-300"
            >
              Résumé
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}