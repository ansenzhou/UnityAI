#pragma strict

var verts : Vector3[];
private var transformedVerts : Vector3[] = null;

// Cache transformed vertex positions if game is running
// This must be modified if we expect the navmesh to move 
// while the game is running.
function getTransformedVerts() : Vector3[] {
	if (!Application.isPlaying || transformedVerts == null) {
		var networkTransform : Transform = transform.parent;
		transformedVerts = new Vector3[3];
		for (var i = 0; i < verts.length; i++) {
			transformedVerts[i] = networkTransform.position + networkTransform.TransformDirection(verts[i]);
		}
	}
	return transformedVerts;
}

function OnDrawGizmos() {
	Gizmos.color = Color.blue;
	var tVerts : Vector3[] = this.getTransformedVerts();
	for (var i = 0; i < tVerts.length; i++) {
        Gizmos.DrawLine (tVerts[i], tVerts[(i+1)%tVerts.length]);
	}
}