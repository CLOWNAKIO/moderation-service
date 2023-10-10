"""added Role field

Revision ID: fa639ee68088
Revises: f4daa689f4bd
Create Date: 2023-10-03 11:24:13.364824

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'fa639ee68088'
down_revision: Union[str, None] = 'f4daa689f4bd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('roles',
    sa.Column('role_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('role_id', 'name'),
    sa.UniqueConstraint('name')
    )
    op.execute("INSERT INTO roles VALUES (1, 'user'), (2, 'student'), (3, 'company'), (4, 'admin')")
    op.add_column('users', sa.Column('role', sa.String(), nullable=True))
    op.alter_column('users', 'registered_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False,
               existing_server_default=sa.text('now()'))
    op.alter_column('users', 'is_verified',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    op.create_foreign_key(None, 'users', 'roles', ['role'], ['name'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='foreignkey')
    op.alter_column('users', 'is_verified',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    op.alter_column('users', 'registered_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True,
               existing_server_default=sa.text('now()'))
    op.drop_column('users', 'role')
    op.drop_table('roles')
    # ### end Alembic commands ###