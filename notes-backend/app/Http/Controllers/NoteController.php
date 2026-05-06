<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    // GET /api/notes — Lister toutes les notes de l'utilisateur connecté
    public function index(Request $request)
    {
        $notes = $request->user()->notes()->latest()->get();
        return response()->json($notes);
    }

    // POST /api/notes — Créer une nouvelle note
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'    => 'required|max:100',
            'content'  => 'nullable|string',
            'priority' => 'required|in:Basse,Moyenne,Haute',
        ]);

        $note = $request->user()->notes()->create($validated);
        return response()->json($note, 201);
    }

    // PUT /api/notes/{id} — Modifier une note
    public function update(Request $request, Note $note)
    {
        if ($note->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Interdit'], 403);
        }

        $validated = $request->validate([
            'title'    => 'required|max:100',
            'content'  => 'nullable|string',
            'priority' => 'required|in:Basse,Moyenne,Haute',
        ]);

        $note->update($validated);
        return response()->json($note);
    }

    // DELETE /api/notes/{id} — Supprimer une note
    public function destroy(Request $request, Note $note)
    {
        if ($note->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Interdit'], 403);
        }

        $note->delete();
        return response()->json(['message' => 'Note supprimée']);
    }
}