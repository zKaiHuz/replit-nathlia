import { useState, useRef, useEffect, useCallback } from "react";
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Palette, X, Type, Pencil, ChevronDown } from "lucide-react";

const PRESET_COLORS = [
  "#000000", "#595959", "#ffffff", "#FAD91B", "#ec7c00",
  "#e35525", "#D4AF37", "#22c55e", "#3b82f6", "#a855f7",
  "#ef4444", "#14b8a6", "#6b7a5e", "#1a1a1a",
];

const FONT_SIZES = [
  { label: "10", value: "10px" },
  { label: "12", value: "12px" },
  { label: "14", value: "14px" },
  { label: "16", value: "16px" },
  { label: "18", value: "18px" },
  { label: "20", value: "20px" },
  { label: "24", value: "24px" },
  { label: "28", value: "28px" },
  { label: "32", value: "32px" },
  { label: "36", value: "36px" },
  { label: "42", value: "42px" },
  { label: "48", value: "48px" },
];

const FONT_FAMILIES = [
  { label: "Poppins", value: "'Poppins', sans-serif" },
  { label: "Montserrat", value: "'Montserrat', sans-serif" },
  { label: "Inter", value: "'Inter', sans-serif" },
  { label: "Roboto", value: "'Roboto', sans-serif" },
  { label: "Open Sans", value: "'Open Sans', sans-serif" },
  { label: "DM Sans", value: "'DM Sans', sans-serif" },
  { label: "Plus Jakarta Sans", value: "'Plus Jakarta Sans', sans-serif" },
  { label: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
  { label: "Outfit", value: "'Outfit', sans-serif" },
  { label: "Oxanium", value: "'Oxanium', sans-serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Lora", value: "'Lora', serif" },
  { label: "Libre Baskerville", value: "'Libre Baskerville', serif" },
  { label: "Merriweather", value: "'Merriweather', serif" },
  { label: "Source Serif 4", value: "'Source Serif 4', serif" },
  { label: "Geist", value: "'Geist', sans-serif" },
  { label: "IBM Plex Sans", value: "'IBM Plex Sans', sans-serif" },
  { label: "Architects Daughter", value: "'Architects Daughter', cursive" },
];

interface StoredEdit {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  textAlign?: string;
  fontFamily?: string;
  text?: string;
  innerHTML?: string;
}

function loadEdits(): Record<string, StoredEdit> {
  try {
    const raw = localStorage.getItem("page-edits");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveEdit(id: string, edit: StoredEdit) {
  const all = loadEdits();
  all[id] = { ...all[id], ...edit };
  localStorage.setItem("page-edits", JSON.stringify(all));
}

function hasOnlyTextChildren(el: HTMLElement): boolean {
  for (const child of Array.from(el.childNodes)) {
    if (child.nodeType === Node.ELEMENT_NODE) return false;
  }
  return true;
}

function applyStoredEdits() {
  const edits = loadEdits();
  for (const [id, edit] of Object.entries(edits)) {
    const el = document.querySelector(`[data-editable="${id}"]`) as HTMLElement | null;
    if (!el) continue;
    if (edit.color) el.style.color = edit.color;
    if (edit.fontSize) el.style.fontSize = edit.fontSize;
    if (edit.fontWeight) el.style.fontWeight = edit.fontWeight;
    if (edit.fontStyle) el.style.fontStyle = edit.fontStyle;
    if (edit.textAlign) el.style.textAlign = edit.textAlign;
    if (edit.fontFamily) el.style.fontFamily = edit.fontFamily;
    if (edit.innerHTML !== undefined) {
      el.innerHTML = edit.innerHTML;
    } else if (edit.text !== undefined && hasOnlyTextChildren(el)) {
      el.innerText = edit.text;
    }
  }
}

interface ToolbarState {
  el: HTMLElement;
  id: string;
  text: string;
  color: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  textAlign: string;
  fontFamily: string;
}

interface SelectionToolbarState {
  range: Range;
  x: number;
  y: number;
  parentEditable: HTMLElement;
}

function wrapSelectionWithStyle(range: Range, style: Record<string, string>) {
  const contents = range.extractContents();
  const span = document.createElement('span');
  span.setAttribute('data-styled-word', 'true');
  Object.entries(style).forEach(([k, v]) => {
    span.style.setProperty(k, v);
  });
  span.appendChild(contents);
  range.insertNode(span);
  window.getSelection()?.removeAllRanges();
}

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [toolbar, setToolbar] = useState<ToolbarState | null>(null);
  const [selToolbar, setSelToolbar] = useState<SelectionToolbarState | null>(null);
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const [selFontDropdown, setSelFontDropdown] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const selToolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apply = () => requestAnimationFrame(() => applyStoredEdits());
    apply();
    const timer = setTimeout(apply, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleElementClick = useCallback((e: MouseEvent) => {
    if (!editMode) return;
    const target = e.target as HTMLElement;
    if (toolbarRef.current?.contains(target)) return;
    if (selToolbarRef.current?.contains(target)) return;
    if (target.closest('[data-edit-toggle]')) return;

    const editable = target.closest('[data-editable]') as HTMLElement | null;
    if (!editable) {
      setToolbar(null);
      return;
    }

    const sel = window.getSelection();
    if (sel && sel.toString().trim().length > 0) {
      return;
    }

    e.preventDefault();

    const id = editable.getAttribute('data-editable') || '';
    const computed = window.getComputedStyle(editable);
    setToolbar({
      el: editable,
      id,
      text: editable.innerText,
      color: computed.color,
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      fontStyle: computed.fontStyle,
      textAlign: computed.textAlign,
      fontFamily: computed.fontFamily,
    });
    setFontDropdownOpen(false);
  }, [editMode]);

  const handleMouseUp = useCallback(() => {
    if (!editMode) return;
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.toString().trim().length === 0) {
        setSelToolbar(null);
        return;
      }
      const range = sel.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const parentEl = container.nodeType === Node.TEXT_NODE ? container.parentElement : container as HTMLElement;
      const editableParent = parentEl?.closest('[data-editable]') as HTMLElement | null;
      if (!editableParent) {
        setSelToolbar(null);
        return;
      }
      const rect = range.getBoundingClientRect();
      setSelToolbar({
        range: range.cloneRange(),
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        parentEditable: editableParent,
      });
      setSelFontDropdown(false);
      setToolbar(null);
    }, 10);
  }, [editMode]);

  useEffect(() => {
    if (editMode) {
      document.addEventListener("click", handleElementClick, true);
      document.addEventListener("mouseup", handleMouseUp);
      document.querySelectorAll('[data-editable]').forEach(el => {
        (el as HTMLElement).style.outline = '2px dashed rgba(236,124,0,0.4)';
        (el as HTMLElement).style.outlineOffset = '2px';
        (el as HTMLElement).style.cursor = 'pointer';
      });
    } else {
      document.querySelectorAll('[data-editable]').forEach(el => {
        (el as HTMLElement).style.outline = '';
        (el as HTMLElement).style.outlineOffset = '';
        (el as HTMLElement).style.cursor = '';
      });
      setSelToolbar(null);
    }
    return () => {
      document.removeEventListener("click", handleElementClick, true);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [editMode, handleElementClick, handleMouseUp]);

  const applyStyle = (cssProp: string, value: string) => {
    if (!toolbar) return;
    toolbar.el.style.setProperty(cssProp, value);
    const storeKey = cssProp === 'color' ? 'color'
      : cssProp === 'font-size' ? 'fontSize'
      : cssProp === 'font-weight' ? 'fontWeight'
      : cssProp === 'font-style' ? 'fontStyle'
      : cssProp === 'text-align' ? 'textAlign'
      : cssProp === 'font-family' ? 'fontFamily'
      : cssProp;
    saveEdit(toolbar.id, { [storeKey]: value });
    setToolbar(prev => prev ? { ...prev, [storeKey]: value } : null);
  };

  const updateText = (newText: string) => {
    if (!toolbar) return;
    if (hasOnlyTextChildren(toolbar.el)) {
      toolbar.el.innerText = newText;
    }
    saveEdit(toolbar.id, { text: newText });
    setToolbar(prev => prev ? { ...prev, text: newText } : null);
  };

  const applyToSelection = (style: Record<string, string>) => {
    if (!selToolbar) return;
    try {
      wrapSelectionWithStyle(selToolbar.range, style);
      const parentEl = selToolbar.parentEditable;
      const id = parentEl.getAttribute('data-editable') || '';
      if (id) {
        saveEdit(id, { innerHTML: parentEl.innerHTML });
      }
      setSelToolbar(null);
    } catch {
      setSelToolbar(null);
    }
  };

  const rgbToHex = (rgb: string) => {
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return "#000000";
    return "#" + match.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
  };

  const getCurrentFontLabel = () => {
    if (!toolbar) return "Fonte";
    const fam = toolbar.fontFamily.toLowerCase();
    const match = FONT_FAMILIES.find(f => fam.includes(f.label.toLowerCase()));
    return match ? match.label : "Fonte";
  };

  return (
    <>
      {children}

      <button
        data-edit-toggle
        data-testid="button-edit-mode"
        onClick={() => { setEditMode(!editMode); setToolbar(null); setSelToolbar(null); }}
        className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
        style={{
          backgroundColor: editMode ? '#ec7c00' : '#1a1a1a',
          border: editMode ? '2px solid #FAD91B' : '2px solid rgba(255,255,255,0.15)',
          boxShadow: editMode ? '0 0 30px rgba(236,124,0,0.5)' : '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        <Pencil className="w-6 h-6 text-white" />
      </button>

      {editMode && (
        <div
          className="fixed bottom-6 right-24 z-[9998] px-4 py-2 rounded-full text-xs font-bold text-white pointer-events-none"
          style={{ backgroundColor: '#ec7c00', boxShadow: '0 2px 12px rgba(236,124,0,0.4)' }}
        >
          MODO EDICAO — clique ou selecione textos
        </div>
      )}

      {editMode && selToolbar && (
        <div
          ref={selToolbarRef}
          className="fixed z-[10000] rounded-xl shadow-2xl border p-2"
          style={{
            backgroundColor: '#1a1a1a',
            borderColor: 'rgba(255,255,255,0.15)',
            left: `${Math.min(Math.max(selToolbar.x - 160, 8), window.innerWidth - 330)}px`,
            top: `${Math.max(selToolbar.y - 140, 8)}px`,
            width: '320px',
          }}
        >
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-white text-[10px] font-bold uppercase tracking-wider opacity-60">Editar selecao</span>
            <button onClick={() => setSelToolbar(null)} className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/10">
              <X className="w-3 h-3 text-white" />
            </button>
          </div>

          <div className="flex items-center gap-1 mb-2">
            <button
              onClick={() => applyToSelection({ 'font-weight': 'bold' })}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
              data-testid="sel-bold"
            >
              <Bold className="w-3.5 h-3.5 text-white" />
            </button>
            <button
              onClick={() => applyToSelection({ 'font-style': 'italic' })}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
              data-testid="sel-italic"
            >
              <Italic className="w-3.5 h-3.5 text-white" />
            </button>
            <div className="w-px h-6 mx-0.5" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            {PRESET_COLORS.slice(0, 8).map((c) => (
              <button
                key={c}
                onClick={() => applyToSelection({ 'color': c })}
                className="w-6 h-6 rounded-full border transition-transform hover:scale-110 flex-shrink-0"
                style={{ backgroundColor: c, borderColor: 'rgba(255,255,255,0.15)' }}
                data-testid={`sel-color-${c}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 mb-1">
            <div className="relative flex-1">
              <button
                onClick={() => setSelFontDropdown(!selFontDropdown)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs text-white"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                data-testid="sel-font-dropdown"
              >
                <span>Fonte</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
              {selFontDropdown && (
                <div
                  className="absolute bottom-full left-0 mb-1 w-full rounded-lg shadow-2xl border overflow-y-auto"
                  style={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(255,255,255,0.12)', maxHeight: '180px' }}
                >
                  {FONT_FAMILIES.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => { applyToSelection({ 'font-family': f.value }); setSelFontDropdown(false); }}
                      className="w-full px-3 py-1.5 text-left text-xs text-white hover:bg-white/10 transition-colors"
                      style={{ fontFamily: f.value }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-0.5">
              {["14px", "18px", "24px", "32px"].map(s => (
                <button
                  key={s}
                  onClick={() => applyToSelection({ 'font-size': s })}
                  className="px-2 py-1.5 rounded-lg text-[10px] font-semibold text-white hover:bg-white/10"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                >
                  {parseInt(s)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {editMode && toolbar && (
        <div
          ref={toolbarRef}
          className="fixed z-[9999] rounded-2xl shadow-2xl border"
          style={{
            backgroundColor: '#1a1a1a',
            borderColor: 'rgba(255,255,255,0.12)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            maxWidth: '92vw',
            maxHeight: '85vh',
            overflowY: 'auto',
          }}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b" style={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(255,255,255,0.08)' }}>
            <span className="text-white text-sm font-bold flex items-center gap-2">
              <Type className="w-4 h-4" style={{ color: '#ec7c00' }} />
              Editor de Texto
            </span>
            <button
              onClick={() => setToolbar(null)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="p-5 space-y-5">
            <div>
              <label className="text-zinc-500 text-xs font-semibold mb-2 block">Texto</label>
              <textarea
                value={toolbar.text}
                onChange={(e) => updateText(e.target.value)}
                className="w-full rounded-xl p-3 text-sm border-none outline-none resize-y"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  minHeight: '70px',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                data-testid="input-edit-text"
              />
            </div>

            <div>
              <label className="text-zinc-500 text-xs font-semibold mb-2 block">Fonte</label>
              <div className="relative">
                <button
                  onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-white transition-colors"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: toolbar.fontFamily,
                  }}
                  data-testid="button-font-dropdown"
                >
                  <span>{getCurrentFontLabel()}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${fontDropdownOpen ? 'rotate-180' : ''}`} style={{ color: '#ec7c00' }} />
                </button>
                {fontDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 w-full rounded-xl shadow-2xl border overflow-y-auto z-20"
                    style={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(255,255,255,0.12)', maxHeight: '220px' }}
                  >
                    {FONT_FAMILIES.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => { applyStyle('font-family', f.value); setFontDropdownOpen(false); }}
                        className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                        style={{ fontFamily: f.value }}
                        data-testid={`font-option-${f.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span>{f.label}</span>
                        {toolbar.fontFamily.toLowerCase().includes(f.label.toLowerCase()) && (
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ec7c00' }} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-zinc-500 text-xs font-semibold mb-2 block">Estilo</label>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => applyStyle('font-weight', toolbar.fontWeight === '700' || toolbar.fontWeight === 'bold' ? 'normal' : 'bold')}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: toolbar.fontWeight === '700' || toolbar.fontWeight === 'bold' ? '#ec7c00' : 'rgba(255,255,255,0.06)',
                  }}
                  data-testid="button-bold"
                >
                  <Bold className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => applyStyle('font-style', toolbar.fontStyle === 'italic' ? 'normal' : 'italic')}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: toolbar.fontStyle === 'italic' ? '#ec7c00' : 'rgba(255,255,255,0.06)',
                  }}
                  data-testid="button-italic"
                >
                  <Italic className="w-4 h-4 text-white" />
                </button>
                <div className="w-px h-7 mx-1" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
                {[
                  { align: "left", icon: AlignLeft },
                  { align: "center", icon: AlignCenter },
                  { align: "right", icon: AlignRight },
                ].map(({ align, icon: Icon }) => (
                  <button
                    key={align}
                    onClick={() => applyStyle('text-align', align)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: toolbar.textAlign === align ? '#ec7c00' : 'rgba(255,255,255,0.06)',
                    }}
                    data-testid={`button-align-${align}`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-zinc-500 text-xs font-semibold mb-2 block">Tamanho (px)</label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {FONT_SIZES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => applyStyle('font-size', s.value)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                    style={{
                      backgroundColor: toolbar.fontSize === s.value ? '#ec7c00' : 'rgba(255,255,255,0.06)',
                      color: '#fff',
                    }}
                    data-testid={`button-size-${s.label}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-zinc-500 text-xs font-semibold mb-2 block flex items-center gap-1">
                <Palette className="w-3 h-3" /> Cor
              </label>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => applyStyle('color', c)}
                    className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                    style={{
                      backgroundColor: c,
                      borderColor: rgbToHex(toolbar.color).toLowerCase() === c.toLowerCase() ? '#ec7c00' : 'rgba(255,255,255,0.12)',
                      boxShadow: rgbToHex(toolbar.color).toLowerCase() === c.toLowerCase() ? '0 0 8px rgba(236,124,0,0.5)' : 'none',
                    }}
                    data-testid={`button-color-${c}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={rgbToHex(toolbar.color)}
                  onChange={(e) => applyStyle('color', e.target.value)}
                  className="w-9 h-9 rounded-lg cursor-pointer border-0 p-0"
                  style={{ backgroundColor: 'transparent' }}
                  data-testid="input-color-picker"
                />
                <input
                  type="text"
                  value={rgbToHex(toolbar.color)}
                  onChange={(e) => {
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                      applyStyle('color', e.target.value);
                    }
                  }}
                  className="rounded-lg px-3 py-2 text-xs font-mono border-none outline-none w-28"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' }}
                  placeholder="#000000"
                  data-testid="input-color-hex"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
